import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { cJoin, cIf } from "helpers/className";
import { isDefined, isDefinedAndNotEmpty } from "helpers/others";
import { atoms } from "contexts/atoms";
import { useAtomSetter, useAtomPair } from "helpers/atoms";

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  CONSTANTS  ╰──────────────────────────────────────────
 */

const LINE_PREFIX = "root@accords-library.com:";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  childrenPaths: string[];
  parentPath: string;
  content?: string;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const Terminal = ({
  parentPath,
  childrenPaths: propsChildrenPaths,
  content,
}: Props): JSX.Element => {
  const [childrenPaths, setChildrenPaths] = useState(propsChildrenPaths);
  const setPlayerName = useAtomSetter(atoms.settings.playerName);

  const [previousCommands, setPreviousCommands] = useAtomPair(atoms.terminal.previousCommands);
  const [previousLines, setPreviousLines] = useAtomPair(atoms.terminal.previousLines);

  const [line, setLine] = useState("");
  const [displayCurrentLine, setDisplayCurrentLine] = useState(true);
  const [previousCommandIndex, setPreviousCommandIndex] = useState(0);
  const [carretPosition, setCarretPosition] = useState(0);
  const router = useRouter();
  const [isTextAreaFocused, setIsTextAreaFocused] = useState(false);

  const terminalInputRef = useRef<HTMLTextAreaElement>(null);
  const terminalWindowRef = useRef<HTMLDivElement>(null);

  router.events.on("routeChangeComplete", () => {
    terminalInputRef.current?.focus();
    setDisplayCurrentLine(true);
  });

  const onRouteChangeRequest = useCallback(
    (newPath: string) => {
      if (newPath !== router.asPath) {
        setDisplayCurrentLine(false);
        router.push(newPath);
      }
    },
    [router]
  );

  const prependLine = useCallback(
    (text: string) => `${LINE_PREFIX}${router.asPath}# ${text}`,
    [router.asPath]
  );

  type Command = {
    key: string;
    description: string;
    handle: (currentLine: string, parameters: string) => string[];
  };
  const commands = useMemo<Command[]>(() => {
    const result: Command[] = [
      {
        key: "ls",
        description: "List directory contents",
        handle: (currentLine) => [
          ...previousLines,
          prependLine(currentLine),
          childrenPaths.join(" "),
        ],
      },

      {
        key: "clear",
        description: "Clear the terminal screen",
        handle: () => [],
      },

      {
        key: "cat",
        description: "Concatenate files and print on the standard output",
        handle: (currentLine) => [
          ...previousLines,
          prependLine(currentLine),
          isDefinedAndNotEmpty(content) ? `\n${content}\n` : `-bash: cat: Nothing to display`,
        ],
      },

      {
        key: "reboot",
        description: "Reboot the machine",
        handle: () => {
          setPlayerName("");
          return [];
        },
      },

      {
        key: "rm",
        description: "Remove files or directories",
        handle: (currentLine, parameters) => {
          console.log(parameters);
          if (parameters.startsWith("-r ")) {
            const folder = parameters.slice("-r ".length);
            if (childrenPaths.includes(folder)) {
              setChildrenPaths((current) => current.filter((path) => path !== folder));
              return [...previousLines, prependLine(currentLine)];
            } else if (folder === "*") {
              setChildrenPaths([]);
              return [...previousLines, prependLine(currentLine)];
            } else if (folder === "") {
              return [
                ...previousLines,
                prependLine(currentLine),
                `rm: missing operand\nTry 'rm -r <path>' to remove a folder`,
              ];
            }
            return [
              ...previousLines,
              prependLine(currentLine),
              `rm: cannot remove '${folder}': No such file or directory`,
            ];
          }
          return [
            ...previousLines,
            prependLine(currentLine),
            `rm: missing operand\nTry 'rm -r <path>' to remove a folder`,
          ];
        },
      },

      {
        key: "help",
        description: "Display this list",
        handle: (currentLine) => [
          ...previousLines,
          prependLine(currentLine),
          `
          GNU bash, version 5.1.4(1)-release (x86_64-pc-linux-gnu)
          These shell commands are defined internally.  Type 'help' to see this list.

          ${result.map((command) => `${command.key}: ${command.description}`).join("\n")}

          `,
        ],
      },

      {
        key: "cd",
        description: "Change the shell working directory",
        handle: (currentLine, parameters) => {
          const newLines = [];
          switch (parameters) {
            case "..": {
              onRouteChangeRequest(parentPath);
              break;
            }
            case "/": {
              onRouteChangeRequest("/");
              break;
            }
            case ".": {
              break;
            }
            default: {
              if (childrenPaths.includes(parameters)) {
                onRouteChangeRequest(`${router.asPath === "/" ? "" : router.asPath}/${parameters}`);
              } else {
                newLines.push(`-bash: cd: ${parameters}: No such file or directory`);
              }
              break;
            }
          }
          return [...previousLines, prependLine(currentLine), ...newLines];
        },
      },
    ];

    return [
      ...result,
      {
        key: "",
        description: "Unhandled command",
        handle: (currentLine) => [
          ...previousLines,
          prependLine(currentLine),
          `-bash: ${currentLine}: command not found`,
        ],
      },
    ];
  }, [
    childrenPaths,
    parentPath,
    content,
    onRouteChangeRequest,
    prependLine,
    previousLines,
    router.asPath,
    setPlayerName,
  ]);

  const onNewLine = useCallback(
    (newLine: string) => {
      for (const command of commands) {
        if (newLine.startsWith(command.key)) {
          setPreviousLines(command.handle(newLine, newLine.slice(command.key.length + 1)));
          setPreviousCommands([newLine, ...previousCommands]);
          return;
        }
      }
    },
    [commands, previousCommands, setPreviousCommands, setPreviousLines]
  );

  useEffect(() => {
    if (terminalWindowRef.current) {
      terminalWindowRef.current.scrollTo({
        top: terminalWindowRef.current.scrollHeight,
      });
    }
  }, [line]);

  return (
    <div className={cJoin("h-screen overflow-hidden bg-light set-theme-font-standard")}>
      <div
        ref={terminalWindowRef}
        className="h-full overflow-scroll scroll-auto p-6 scrollbar-none">
        {previousLines.map((previousLine, index) => (
          <p key={index} className="whitespace-pre-line font-realmono">
            {previousLine}
          </p>
        ))}

        <div className="relative">
          <textarea
            className="absolute -top-1 -left-6 -right-6 w-screen rounded-none opacity-0"
            spellCheck={false}
            autoCapitalize="none"
            autoCorrect="off"
            placeholder="placeholder"
            ref={terminalInputRef}
            value={line}
            onSelect={() => {
              if (terminalInputRef.current) {
                setCarretPosition(terminalInputRef.current.selectionStart);
                terminalInputRef.current.selectionEnd = terminalInputRef.current.selectionStart;
              }
            }}
            onBlur={() => setIsTextAreaFocused(false)}
            onFocus={() => setIsTextAreaFocused(true)}
            onKeyDown={(event) => {
              if (event.key === "ArrowUp") {
                event.preventDefault();
                let newPreviousCommandIndex = previousCommandIndex;
                if (previousCommandIndex < previousCommands.length - 1) {
                  newPreviousCommandIndex += 1;
                }
                setPreviousCommandIndex(newPreviousCommandIndex);
                const previousCommand = previousCommands[newPreviousCommandIndex];
                if (isDefined(previousCommand)) {
                  setLine(previousCommand);
                  setCarretPosition(previousCommand.length);
                }
              }
              if (event.key === "ArrowDown") {
                event.preventDefault();
                let newPreviousCommandIndex = previousCommandIndex;
                if (previousCommandIndex > 0) {
                  newPreviousCommandIndex -= 1;
                }
                setPreviousCommandIndex(newPreviousCommandIndex);
                const previousCommand = previousCommands[newPreviousCommandIndex];
                if (isDefined(previousCommand)) {
                  setLine(previousCommand);
                  setCarretPosition(previousCommand.length);
                }
              }
            }}
            onInput={() => {
              if (terminalInputRef.current) {
                if (terminalInputRef.current.value.includes("\n")) {
                  setLine("");
                  onNewLine(line);
                } else {
                  setLine(terminalInputRef.current.value);
                }
                setCarretPosition(terminalInputRef.current.selectionStart);
              }
            }}
          />
          {displayCurrentLine && (
            <p className="whitespace-normal font-realmono">
              {prependLine("")}
              {line.slice(0, carretPosition)}
              <span
                className={cJoin(
                  "whitespace-pre font-realmono",
                  cIf(isTextAreaFocused, "animate-carret border-b-2 border-black")
                )}>
                {line[carretPosition] ?? " "}
              </span>
              {line.slice(carretPosition + 1)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
