type DesignRushBadgeProps = {
  className?: string;
  rating?: number;
  reviewCount?: number;
  fill?: boolean;
  width?: number;
  height?: number;
  radius?: number;
};

function GoldStar({ size }: { size: number | string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 15 14"
      width={size}
      height={size}
      fill="none"
      style={{ maxWidth: "none", display: "block" }}
    >
      <path
        d="M7.21468 0.878116C7.30449 0.601722 7.69551 0.601722 7.78532 0.878115L9.1165 4.97508C9.15666 5.09868 9.27185 5.18237 9.40182 5.18237H13.7096C14.0002 5.18237 14.1211 5.55426 13.886 5.72508L10.4009 8.25714C10.2957 8.33353 10.2517 8.46894 10.2919 8.59255L11.6231 12.6895C11.7129 12.9659 11.3965 13.1957 11.1614 13.0249L7.67634 10.4929C7.57119 10.4165 7.42881 10.4165 7.32366 10.4929L3.83858 13.0249C3.60347 13.1957 3.28712 12.9659 3.37693 12.6895L4.70811 8.59255C4.74827 8.46894 4.70428 8.33353 4.59913 8.25714L1.11405 5.72508C0.878932 5.55426 0.999764 5.18237 1.29038 5.18237H5.59818C5.72815 5.18237 5.84334 5.09868 5.8835 4.97508L7.21468 0.878116Z"
        fill="#F3C03F"
      />
    </svg>
  );
}

function RatingStars({
  rating,
  size,
}: {
  rating: number;
  size: number | string;
}) {
  const full = Math.floor(rating);
  const fraction = rating - full;

  return (
    <span
      aria-hidden
      style={{ display: "inline-flex", alignItems: "center", gap: 2 }}
    >
      {Array.from({ length: 5 }).map((_, index) => {
        if (index < full) {
          return <GoldStar key={index} size={size} />;
        }

        if (index === full && fraction > 0) {
          return (
            <span
              key={index}
              style={{
                position: "relative",
                width: size,
                height: size,
                flexShrink: 0,
                display: "inline-block",
              }}
            >
              <svg
                aria-hidden
                viewBox="0 0 15 14"
                width={size}
                height={size}
                fill="none"
                style={{
                  position: "absolute",
                  inset: 0,
                  maxWidth: "none",
                  display: "block",
                }}
              >
                <path
                  d="M7.21468 0.878116C7.30449 0.601722 7.69551 0.601722 7.78532 0.878115L9.1165 4.97508C9.15666 5.09868 9.27185 5.18237 9.40182 5.18237H13.7096C14.0002 5.18237 14.1211 5.55426 13.886 5.72508L10.4009 8.25714C10.2957 8.33353 10.2517 8.46894 10.2919 8.59255L11.6231 12.6895C11.7129 12.9659 11.3965 13.1957 11.1614 13.0249L7.67634 10.4929C7.57119 10.4165 7.42881 10.4165 7.32366 10.4929L3.83858 13.0249C3.60347 13.1957 3.28712 12.9659 3.37693 12.6895L4.70811 8.59255C4.74827 8.46894 4.70428 8.33353 4.59913 8.25714L1.11405 5.72508C0.878932 5.55426 0.999764 5.18237 1.29038 5.18237H5.59818C5.72815 5.18237 5.84334 5.09868 5.8835 4.97508L7.21468 0.878116Z"
                  fill="#7b601d"
                />
              </svg>
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  width: `${Math.round(fraction * 100)}%`,
                  overflow: "hidden",
                }}
              >
                <GoldStar size={size} />
              </span>
            </span>
          );
        }

        return (
          <svg
            key={index}
            aria-hidden
            viewBox="0 0 15 14"
            width={size}
            height={size}
            fill="none"
            style={{ maxWidth: "none", display: "block" }}
          >
            <path
              d="M7.21468 0.878116C7.30449 0.601722 7.69551 0.601722 7.78532 0.878115L9.1165 4.97508C9.15666 5.09868 9.27185 5.18237 9.40182 5.18237H13.7096C14.0002 5.18237 14.1211 5.55426 13.886 5.72508L10.4009 8.25714C10.2957 8.33353 10.2517 8.46894 10.2919 8.59255L11.6231 12.6895C11.7129 12.9659 11.3965 13.1957 11.1614 13.0249L7.67634 10.4929C7.57119 10.4165 7.42881 10.4165 7.32366 10.4929L3.83858 13.0249C3.60347 13.1957 3.28712 12.9659 3.37693 12.6895L4.70811 8.59255C4.74827 8.46894 4.70428 8.33353 4.59913 8.25714L1.11405 5.72508C0.878932 5.55426 0.999764 5.18237 1.29038 5.18237H5.59818C5.72815 5.18237 5.84334 5.09868 5.8835 4.97508L7.21468 0.878116Z"
              fill="#7b601d"
            />
          </svg>
        );
      })}
    </span>
  );
}

export function DesignRushBadge({
  className,
  rating = 4.3,
  reviewCount = 1,
  fill = false,
  width = 188,
  height = 74,
  radius = 3,
}: DesignRushBadgeProps) {
  const reviewLabel = reviewCount === 1 ? "1 REVIEW" : `${reviewCount} REVIEWS`;

  if (fill) {
    return (
      <div
        role="img"
        aria-label={`DesignRush ${rating} rating from ${reviewCount} review${reviewCount === 1 ? "" : "s"}`}
        className={className}
        style={{
          position: "relative",
          boxSizing: "border-box",
          containerType: "size",
          width: "100%",
          height: "100%",
          flexShrink: 0,
          borderRadius: radius,
          overflow: "hidden",
          backgroundColor: "#08378F",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/badges/designrush/bg-dark.svg"
          alt=""
          width={188}
          height={74}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            maxWidth: "none",
            maxHeight: "none",
            objectFit: "fill",
            display: "block",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: "3.5cqh",
            paddingRight: "4cqi",
            color: "#fff",
          }}
        >
          <span
            style={{
              fontSize: "19cqh",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {reviewLabel}
          </span>

          <span
            style={{
              display: "flex",
              alignItems: "center",
              lineHeight: 1.1,
            }}
          >
            <span
              style={{
                marginRight: 3,
                fontSize: "20cqh",
                fontWeight: 400,
              }}
            >
              ON
            </span>
            <span
              style={{
                fontSize: "19cqh",
                fontWeight: 700,
                letterSpacing: "0.07em",
              }}
            >
              DESIGNRUSH
            </span>
          </span>

          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4em",
            }}
          >
            <span
              style={{
                fontSize: "38cqh",
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "0.03em",
              }}
            >
              {rating.toFixed(1)}
            </span>
            <RatingStars rating={rating} size="22cqh" />
          </span>
        </div>
      </div>
    );
  }

  const starSize = Math.max(11, Math.round(height * 0.16));
  const titleSize = Math.max(10, Math.round(height * 0.135));
  const ratingSize = Math.max(16, Math.round(height * 0.27));

  return (
    <div
      role="img"
      aria-label={`DesignRush ${rating} rating from ${reviewCount} review${reviewCount === 1 ? "" : "s"}`}
      className={className}
      style={{
        position: "relative",
        boxSizing: "border-box",
        width,
        height,
        minWidth: width,
        maxWidth: width,
        minHeight: height,
        maxHeight: height,
        flexShrink: 0,
        borderRadius: 3,
        overflow: "hidden",
        backgroundColor: "#08378F",
        aspectRatio: "188 / 74",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/badges/designrush/bg-dark.svg"
        alt=""
        width={188}
        height={74}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          maxWidth: "none",
          maxHeight: "none",
          objectFit: "fill",
          display: "block",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: Math.round(height * 0.05),
          paddingRight: Math.round(width * 0.055),
          color: "#fff",
        }}
      >
        <span
          style={{
            fontSize: titleSize,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {reviewLabel}
        </span>

        <span
          style={{
            display: "flex",
            alignItems: "center",
            lineHeight: 1.1,
          }}
        >
          <span
            style={{
              marginRight: 3,
              fontSize: titleSize + 1,
              fontWeight: 400,
            }}
          >
            ON
          </span>
          <span
            style={{
              fontSize: titleSize,
              fontWeight: 700,
              letterSpacing: "0.07em",
            }}
          >
            DESIGNRUSH
          </span>
        </span>

        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <span
            style={{
              fontSize: ratingSize,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "0.03em",
            }}
          >
            {rating.toFixed(1)}
          </span>
          <RatingStars rating={rating} size={starSize} />
        </span>
      </div>
    </div>
  );
}
