import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import langchainLogo from "@/assets/images/langchain.svg";
import { cn } from "@/lib/utils";
import { siClaude, siMeta } from "simple-icons";

type IconKind =
  | "openai"
  | "claude"
  | "whisper"
  | "langchain"
  | "opensource"
  | "vertex";

function Tile({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl sm:size-[3.75rem]",
        className,
      )}
      style={style}
      aria-hidden
    >
      {children}
    </span>
  );
}

function MarkSvg({
  path,
  fill,
  title,
}: {
  path: string;
  fill: string;
  title: string;
}) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className="size-7 sm:size-8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <path d={path} fill={fill} />
    </svg>
  );
}

export function PlatformIcon({
  kind,
  className,
}: {
  kind: IconKind;
  tint?: string;
  className?: string;
}) {
  /* Exact marks cropped from the user reference — match Claude/Meta tile size */
  if (kind === "openai") {
    return (
      <span
        className={cn(
          "inline-flex size-14 shrink-0 items-center justify-center sm:size-[3.75rem]",
          className,
        )}
      >
        <Image
          src="/brand/openai.png"
          alt="OpenAI"
          width={56}
          height={56}
          className="size-10 object-contain sm:size-11"
          unoptimized
        />
      </span>
    );
  }

  if (kind === "whisper") {
    return (
      <span
        className={cn(
          "inline-flex size-14 shrink-0 items-center justify-center sm:size-[3.75rem]",
          className,
        )}
      >
        <Image
          src="/brand/whisper.png"
          alt="Whisper"
          width={60}
          height={60}
          className="size-14 object-contain sm:size-[3.75rem]"
          unoptimized
        />
      </span>
    );
  }

  if (kind === "langchain") {
    return (
      <Tile className={cn("bg-[#E8F4F1]", className)}>
        <Image
          src={langchainLogo}
          alt="LangChain"
          width={44}
          height={44}
          className="size-10 sm:size-11"
        />
      </Tile>
    );
  }

  if (kind === "vertex") {
    return (
      <span className={cn("inline-flex shrink-0", className)}>
        <Tile className="bg-white">
          <Image
            src="/brand/gemini.svg"
            alt="Google Gemini"
            width={36}
            height={36}
            className="size-8 sm:size-9"
            unoptimized
          />
        </Tile>
      </span>
    );
  }

  if (kind === "claude") {
    return (
      <Tile className={className} style={{ backgroundColor: "#D97757" }}>
        <MarkSvg path={siClaude.path} fill="#FFFFFF" title="Claude" />
      </Tile>
    );
  }

  return (
    <Tile
      className={cn("rounded-full", className)}
      style={{ backgroundColor: "#0668E1" }}
    >
      <MarkSvg path={siMeta.path} fill="#FFFFFF" title="Meta" />
    </Tile>
  );
}
