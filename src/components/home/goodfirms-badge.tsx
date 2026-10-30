import Image from "next/image";
import goodfirmsLogo from "@/assets/images/widgets-goodfirms.png";

type GoodFirmsBadgeProps = {
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  radius?: number;
};

function GoldStars({ size }: { size: number | string }) {
  return (
    <div
      aria-hidden
      style={{ display: "flex", alignItems: "center", gap: "0.25em" }}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          viewBox="0 0 14 14"
          width={size}
          height={size}
          style={{ maxWidth: "none", display: "block" }}
        >
          <path
            d="M7 0.6l1.8 3.65 4.03.59-2.92 2.84.69 4.01L7 9.8l-3.6 1.89.69-4.01L1.17 4.84l4.03-.59L7 0.6z"
            fill="#E8A317"
          />
        </svg>
      ))}
    </div>
  );
}

export function GoodFirmsBadge({
  className,
  fill = false,
  width = 118,
  height = 74,
  radius = 0,
}: GoodFirmsBadgeProps) {
  if (fill) {
    return (
      <div
        role="img"
        aria-label="GoodFirms Excellent rating"
        className={className}
        style={{
          boxSizing: "border-box",
          containerType: "size",
          display: "flex",
          width: "100%",
          height: "100%",
          flexShrink: 0,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          borderRadius: radius,
          padding: "4% 4%",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#000",
            fontSize: "21cqh",
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Excellent
        </p>
        <div style={{ marginTop: "5cqh" }}>
          <GoldStars size="23cqh" />
        </div>
        <Image
          src={goodfirmsLogo}
          alt=""
          aria-hidden
          width={200}
          height={40}
          style={{
            marginTop: "5cqh",
            height: "32cqh",
            width: "auto",
            maxWidth: "82%",
            objectFit: "contain",
          }}
          sizes="30vw"
          priority
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label="GoodFirms Excellent rating"
      className={className}
      style={{
        boxSizing: "border-box",
        display: "flex",
        width,
        height,
        minWidth: width,
        maxWidth: width,
        minHeight: height,
        maxHeight: height,
        flexShrink: 0,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        padding: `${Math.round(height * 0.1)}px ${Math.round(width * 0.08)}px`,
      }}
    >
      <p
        style={{
          margin: 0,
          color: "#000",
          fontSize: Math.max(11, Math.round(height * 0.13)),
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Excellent
      </p>
      <div style={{ marginTop: Math.round(height * 0.08) }}>
        <GoldStars size={Math.max(11, Math.round(height * 0.14))} />
      </div>
      <Image
        src={goodfirmsLogo}
        alt=""
        aria-hidden
        width={Math.round(width * 0.7)}
        height={Math.max(16, Math.round(height * 0.22))}
        style={{
          marginTop: Math.round(height * 0.08),
          height: Math.max(16, Math.round(height * 0.22)),
          width: "auto",
          maxWidth: "none",
          objectFit: "contain",
        }}
        sizes={`${width}px`}
        priority
      />
    </div>
  );
}
