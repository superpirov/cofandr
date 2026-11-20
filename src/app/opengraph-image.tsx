import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name} — запуск кофейни с нуля`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(circle at 82% 110%, rgba(199,165,107,0.35), rgba(9,9,11,0) 55%)",
          color: "#f5f5f7",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 24,
            letterSpacing: 8,
            color: "#c7a56b",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              backgroundColor: "#c7a56b",
            }}
          />
          {site.name}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.02,
              letterSpacing: -3,
              maxWidth: 900,
              fontWeight: 600,
            }}
          >
            Кофейня с нуля
          </div>
          <div style={{ fontSize: 28, color: "#a1a1aa", maxWidth: 720 }}>
            На опыте владельцев 8+ действующих точек
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: 28,
            fontSize: 20,
            color: "#71717a",
          }}
        >
          <span>8+ ДЕЙСТВУЮЩИХ ТОЧЕК</span>
          <span style={{ color: "#c7a56b" }}>КОФЕЙНЫЙ БИЗНЕС</span>
        </div>

        <div
          style={{
            position: "absolute",
            right: -140,
            top: -140,
            width: 520,
            height: 520,
            borderRadius: 999,
            border: "1px solid rgba(199,165,107,0.35)",
          }}
        />
      </div>
    ),
    size,
  );
}
