"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import clutchReview from "@/assets/images/clutch-review.webp";
import { DesignRushBadge } from "@/components/home/design-rush-badge";
import { GoodFirmsBadge } from "@/components/home/goodfirms-badge";

/** Official DesignRush widget is 188×74 — keep that ratio at every size */
const ASPECT = "188 / 74";
const RADIUS = 12;
const GAP = 12;
const PAD = 12;
const INNER_PAD = 10;
const MAX_BADGE_W = Math.round(188 * 1.65); // 310
const STRIP_MAX = MAX_BADGE_W * 3 + GAP * 2 + PAD * 2;

const plateStyle: CSSProperties = {
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  borderRadius: RADIUS,
  border: "1px solid rgba(26,16,48,0.08)",
  boxShadow: "0 14px 36px -22px rgba(26,16,48,0.35)",
  padding: INNER_PAD,
};

const cellStyle: CSSProperties = {
  minWidth: 0,
  width: "100%",
  aspectRatio: ASPECT,
  flex: "1 1 0",
};

const linkStyle: CSSProperties = {
  ...plateStyle,
  textDecoration: "none",
  color: "inherit",
  cursor: "pointer",
};

const GOODFIRMS_URL = "https://www.goodfirms.co/company/srh-softwares";
const DESIGNRUSH_URL =
  "https://www.designrush.com/agency/profile/srh-software#reviews";

export function HeroCertifications() {
  return (
    <section
      aria-label="Trusted ratings"
      style={{
        width: "100%",
        backgroundColor: "#FAFBFD",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: STRIP_MAX + 32,
          marginLeft: "auto",
          marginRight: "auto",
          padding: "24px 16px 16px",
        }}
      >
        <div
          style={{
            boxSizing: "border-box",
            width: "100%",
            maxWidth: STRIP_MAX,
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: 18,
            border: "1px solid var(--line)",
            backgroundColor: "#ffffff",
            padding: PAD,
            boxShadow: "0 18px 44px -30px rgba(67,1,178,0.28)",
          }}
        >
          <ul
            style={{
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "stretch",
              justifyContent: "center",
              gap: GAP,
              margin: 0,
              padding: 0,
              listStyle: "none",
              width: "100%",
            }}
          >
            <li style={cellStyle}>
              <div
                style={{
                  ...plateStyle,
                  backgroundColor: "#0a0a0a",
                  padding: 16,
                }}
              >
                <Image
                  src={clutchReview}
                  alt="Reviewed on Clutch — 5.0 rating"
                  width={MAX_BADGE_W}
                  height={Math.round(MAX_BADGE_W * (74 / 188))}
                  style={{
                    width: "86%",
                    height: "86%",
                    maxWidth: "none",
                    objectFit: "contain",
                  }}
                  sizes="(max-width: 720px) 30vw, 310px"
                  priority
                />
              </div>
            </li>

            <li style={cellStyle}>
              <a
                href={GOODFIRMS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View SRH Softwares on GoodFirms"
                style={{
                  ...linkStyle,
                  backgroundColor: "#ffffff",
                  border: "1px solid var(--line)",
                }}
              >
                <GoodFirmsBadge fill radius={RADIUS - 2} />
              </a>
            </li>

            <li style={cellStyle}>
              <a
                href={DESIGNRUSH_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View SRH Software reviews on DesignRush"
                style={{
                  ...linkStyle,
                  border: "1px solid rgba(26,16,48,0.12)",
                  backgroundColor: "#08378F",
                }}
              >
                <DesignRushBadge fill radius={RADIUS - 2} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
