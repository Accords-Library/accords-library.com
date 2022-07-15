import Link from "next/link";
import { Chip } from "./Chip";
import { Img } from "./Img";
import { UploadImageFragment } from "graphql/generated";
import { ImageQuality } from "helpers/img";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  thumbnail?: UploadImageFragment | string | null | undefined;
  thumbnailAspectRatio?: string;
  href: string;
  pre_title?: string | null | undefined;
  title: string | null | undefined;
  subtitle?: string | null | undefined;
  topChips?: string[];
  bottomChips?: string[];
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const PreviewLine = ({
  href,
  thumbnail,
  pre_title,
  title,
  subtitle,
  topChips,
  bottomChips,
  thumbnailAspectRatio,
}: Props): JSX.Element => (
  <Link href={href} passHref>
    <div
      className="flex h-36 w-full cursor-pointer flex-row place-items-center gap-4 overflow-hidden
        rounded-md bg-light pr-4 transition-transform drop-shadow-shade-xl hover:scale-[1.02]"
    >
      {thumbnail ? (
        <div className="aspect-[3/2] h-full">
          <Img className="h-full object-cover" image={thumbnail} quality={ImageQuality.Medium} />
        </div>
      ) : (
        <div style={{ aspectRatio: thumbnailAspectRatio }}></div>
      )}
      <div className="grid gap-2">
        {topChips && topChips.length > 0 && (
          <div className="grid grid-flow-col place-content-start gap-1 overflow-hidden">
            {topChips.map((text, index) => (
              <Chip key={index} text={text} />
            ))}
          </div>
        )}
        <div className="my-1 flex flex-col">
          {pre_title && <p className="mb-1 leading-none">{pre_title}</p>}
          {title && (
            <p className="font-headers text-lg font-bold leading-none">
              {title}
            </p>
          )}
          {subtitle && <p className="leading-none">{subtitle}</p>}
        </div>
        {bottomChips && bottomChips.length > 0 && (
          <div className="grid grid-flow-col place-content-start gap-1 overflow-hidden">
            {bottomChips.map((text, index) => (
              <Chip key={index} className="text-sm" text={text} />
            ))}
          </div>
        )}
      </div>
    </div>
  </Link>
);
