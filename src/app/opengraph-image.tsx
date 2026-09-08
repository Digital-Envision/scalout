import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { SITE_URL } from "@/lib/site";
import { OG_IMAGE } from "@/lib/seo";

export const alt = OG_IMAGE.alt;
export const size = { width: OG_IMAGE.width, height: OG_IMAGE.height };
export const contentType = "image/png";

/* Lifted from globals.css so the card and the site stay one language. */
const INK = "#070a10";
const BRAND = "#2f6fe4";
const HAIRLINE = "rgba(255,255,255,0.055)";
const GRID = 48;

const asset = (...parts: string[]) => join(process.cwd(), "public", ...parts);

/**
 * The card every share of this site renders as. Statically generated at build
 * time — nothing here reads a request — so it costs the running container
 * nothing.
 */
export default async function Image() {
  const [extraBold, medium, wordmark] = await Promise.all([
    readFile(asset("assets", "fonts", "PlusJakartaSans-ExtraBold.ttf")),
    readFile(asset("assets", "fonts", "PlusJakartaSans-Medium.ttf")),
    readFile(asset("assets", "brand", "logo-invert.png")),
  ]);

  const logoSrc = `data:image/png;base64,${wordmark.toString("base64")}`;
  const host = new URL(SITE_URL).host;

  // The hairline grid is drawn as explicit rules rather than a repeating
  // gradient: Satori's gradient support is narrower than a browser's, and at
  // this size the rules are cheap.
  const columns = Array.from(
    { length: Math.ceil(size.width / GRID) },
    (_, i) => (i + 1) * GRID,
  );
  const rows = Array.from(
    { length: Math.ceil(size.height / GRID) },
    (_, i) => (i + 1) * GRID,
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          // Stand-in for the hero shader: the brand blue bleeding in from the
          // right, the way it does behind every page hero. Painted on the root
          // rather than a child box, so there is no bounding box for Satori to
          // leave a visible edge on.
          backgroundImage: `radial-gradient(42% 72% at 90% 16%, ${BRAND} 0%, rgba(47,111,228,0.22) 44%, ${INK} 78%)`,
          padding: "72px 80px",
          position: "relative",
          fontFamily: "Jakarta",
        }}
      >
        {columns.map((x) => (
          <div
            key={`c${x}`}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: x,
              width: 1,
              background: HAIRLINE,
            }}
          />
        ))}
        {rows.map((y) => (
          <div
            key={`r${y}`}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: y,
              height: 1,
              background: HAIRLINE,
            }}
          />
        ))}

        <div style={{ display: "flex", position: "relative" }}>
          <img src={logoSrc} width={181} height={38} alt="" />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 20,
              fontWeight: 500,
              letterSpacing: "0.16em",
              color: "#7aa9ff",
            }}
          >
            INDONESIA · SOUTHEAST ASIA
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              maxWidth: 900,
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            Build your technology team, compliant from day one.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            paddingTop: 28,
            borderTop: "1px solid rgba(255,255,255,0.16)",
            fontSize: 22,
            fontWeight: 500,
            color: "rgba(255,255,255,0.62)",
          }}
        >
          <div style={{ display: "flex" }}>
            Employer of record · Recruitment · Workspace
          </div>
          <div style={{ display: "flex", color: "#ffffff" }}>{host}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Jakarta", data: extraBold, weight: 800, style: "normal" },
        { name: "Jakarta", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
