import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface MarkdownProps {
  className?: string;
  text: string;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const Markdown = ({ className, text }: MarkdownProps): JSX.Element => (
  <div
    className={className}
    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(text)) }}
  />
);
