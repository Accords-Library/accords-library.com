import { useCallback, useEffect, useId, useState } from "react";
import Slider from "rc-slider";
import { useHotkeys } from "react-hotkeys-hook";
import { Button } from "components/Inputs/Button";
import { prettyDuration } from "helpers/formatters";
import { ButtonGroup } from "components/Inputs/ButtonGroup";
import { cIf, cJoin } from "helpers/className";
import { useFullscreen } from "hooks/useFullscreen";
import { isDefined, isDefinedAndNotEmpty, isUndefined } from "helpers/asserts";
import { useAtomGetter } from "helpers/atoms";
import { atoms } from "contexts/atoms";
import { ToolTip } from "components/ToolTip";

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  CONSTANTS  ╰──────────────────────────────────────────
 */

const STEP_MULTIPLIER = 100;

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface AudioPlayerProps {
  src?: string;
  className?: string;
  title?: string;
}

export const AudioPlayer = ({ src, className, title }: AudioPlayerProps): JSX.Element => {
  const [ref, setRef] = useState<HTMLAudioElement | null>(null);
  const [isFocused, setFocus] = useState(false);

  return (
    <div
      className={cJoin("w-full", className)}
      tabIndex={0}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}>
      <audio ref={setRef} src={src} />
      {ref && (
        <PlayerControls
          className={className}
          mediaRef={ref}
          type="audio"
          src={src}
          title={title}
          isFocused={isFocused}
        />
      )}
    </div>
  );
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

interface VideoPlayerProps {
  src?: string;
  className?: string;
  title?: string;
  rounded?: boolean;
  subSrc?: string;
}

export const VideoPlayer = ({
  src,
  className,
  title,
  subSrc,
  rounded = true,
}: VideoPlayerProps): JSX.Element => {
  const [ref, setRef] = useState<HTMLVideoElement | null>(null);
  const videoId = useId();
  const { isFullscreen, toggleFullscreen } = useFullscreen(videoId);
  const [isPlaying, setPlaying] = useState(false);
  const [isFocused, setFocus] = useState(false);

  const togglePlayback = useCallback(
    async () => (isPlaying ? ref?.pause() : await ref?.play()),
    [isPlaying, ref]
  );

  return (
    <div
      className={cJoin("grid w-full", className)}
      id={videoId}
      tabIndex={0}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}>
      <video
        ref={setRef}
        className={cJoin("h-full w-full", cIf(!isFullscreen && rounded, "rounded-t-4xl"))}
        crossOrigin="anonymous"
        onClick={togglePlayback}
        onDoubleClick={toggleFullscreen}>
        <source type="video/mp4" src={src} />
        {subSrc && <track label="English" kind="subtitles" srcLang="en" src={subSrc} default />}
      </video>
      {ref && (
        <PlayerControls
          title={title}
          mediaRef={ref}
          src={src}
          type="video"
          className={cIf(isFullscreen || !rounded, "rounded-none", "rounded-b-4xl rounded-t-none")}
          fullscreen={{ isFullscreen, toggleFullscreen }}
          onPlaybackChanged={setPlaying}
          isFocused={isFocused}
          hasCC={isDefined(subSrc)}
        />
      )}
    </div>
  );
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

interface PlayerControls {
  mediaRef: HTMLMediaElement;
  src?: string;
  title?: string;
  className?: string;
  isFocused?: boolean;
  type: "audio" | "video";
  fullscreen?: {
    isFullscreen: boolean;
    toggleFullscreen: () => void;
  };
  onPlaybackChanged?: (isPlaying: boolean) => void;
  hasCC?: boolean;
}

const PlayerControls = ({
  mediaRef,
  className,
  src,
  title,
  fullscreen,
  isFocused = false,
  hasCC = false,
  type,
  onPlaybackChanged,
}: PlayerControls) => {
  const [isPlaying, setPlaying] = useState(false);
  const [duration, setDuration] = useState(mediaRef.duration);
  const [currentTime, setCurrentTime] = useState(mediaRef.currentTime);
  const [isMuted, setMuted] = useState(mediaRef.volume === 0);
  const [hasEnded, setEnded] = useState(false);
  const [ccVisible, setCCVisible] = useState(hasCC);
  const isContentPanelAtLeastXl = useAtomGetter(atoms.containerQueries.isContentPanelAtLeastXl);
  const isContentPanelAtLeastMd = useAtomGetter(atoms.containerQueries.isContentPanelAtLeastMd);

  const togglePlayback = useCallback(
    async () => (isPlaying ? mediaRef.pause() : await mediaRef.play()),
    [isPlaying, mediaRef]
  );

  useHotkeys(
    "left",
    () => {
      mediaRef.currentTime -= 5;
    },
    { enabled: isFocused }
  );

  useHotkeys(
    "right",
    () => {
      mediaRef.currentTime += 5;
    },
    { enabled: isFocused }
  );

  useEffect(() => {
    const audio = mediaRef;
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });

    audio.addEventListener("play", () => {
      setPlaying(true);
      onPlaybackChanged?.(true);
      setEnded(false);
    });
    audio.addEventListener("pause", () => {
      setPlaying(false);
      onPlaybackChanged?.(false);
    });

    audio.addEventListener("ended", () => setEnded(true));

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
    });

    return () => audio.pause();
  }, [mediaRef, onPlaybackChanged]);

  useEffect(() => {
    const textTrack = mediaRef.textTracks[0];
    if (isUndefined(textTrack)) return;
    textTrack.mode = ccVisible ? "showing" : "hidden";
  }, [ccVisible, mediaRef.textTracks]);

  const buttonGroup = (
    <ButtonGroup
      vertical={!isContentPanelAtLeastXl && type === "video"}
      buttonsProps={[
        {
          icon: isMuted ? "volume_off" : "volume_up",
          active: isMuted,
          onClick: () => {
            setMuted((oldMutedValue) => {
              const newMutedValue = !oldMutedValue;
              mediaRef.volume = newMutedValue ? 0 : 1;
              return newMutedValue;
            });
          },
        },
        {
          icon: "closed_caption",
          active: ccVisible,
          onClick: () => setCCVisible((value) => !value),
          visible: hasCC,
        },
        {
          icon: fullscreen?.isFullscreen ? "fullscreen_exit" : "fullscreen",
          active: fullscreen?.isFullscreen,
          onClick: fullscreen?.toggleFullscreen,
          visible: isDefined(fullscreen),
        },
        { icon: "download", href: src, alwaysNewTab: true },
      ]}
    />
  );

  return (
    <div
      className={cJoin(
        `relative flex w-full place-items-center  rounded-full
         bg-highlight p-3 shadow-md shadow-shade/50`,
        cIf(isContentPanelAtLeastMd, "gap-5", "gap-3"),
        className
      )}>
      <Button
        icon={hasEnded ? "replay" : isPlaying ? "pause" : "play_arrow"}
        active={isPlaying}
        onClick={togglePlayback}
      />
      <div className="grid w-full place-items-start">
        {isDefinedAndNotEmpty(title) && (
          <p className="line-clamp-1 text-left text-xs text-dark">{title}</p>
        )}
        <div
          className={cJoin(
            "flex w-full place-content-between place-items-center",
            cIf(isContentPanelAtLeastMd, "gap-5", "gap-3")
          )}>
          <p className={cJoin("font-mono", cIf(isContentPanelAtLeastMd, "h-5", "h-3 text-xs"))}>
            {prettyDuration(currentTime)}
          </p>
          <Slider
            className={cIf(
              !isContentPanelAtLeastXl && type === "video",
              "!absolute left-0 right-0 top-[-5px]"
            )}
            value={currentTime * STEP_MULTIPLIER}
            onChange={(value) => {
              const newTime = (value as number) / STEP_MULTIPLIER;
              mediaRef.currentTime = newTime;
              setCurrentTime(newTime);
            }}
            onAfterChange={async () => await mediaRef.play()}
            max={duration * STEP_MULTIPLIER}
          />
          {!isContentPanelAtLeastXl && type === "video" && <p>/</p>}
          <p className={cJoin("font-mono", cIf(isContentPanelAtLeastMd, "h-5", "h-3 text-xs"))}>
            {prettyDuration(duration)}
          </p>
        </div>
      </div>
      {isContentPanelAtLeastXl ? (
        buttonGroup
      ) : (
        <ToolTip content={buttonGroup}>
          <Button icon="more_vert" />
        </ToolTip>
      )}
    </div>
  );
};
