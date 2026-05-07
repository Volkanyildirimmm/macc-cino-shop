import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "macc-cino — Matcha Konsantre";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background:
            "linear-gradient(135deg, #1e3a0f 0%, #2D5016 50%, #3D6B1C 100%)",
          color: "#F7F5F0",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
            fontSize: "28px",
            color: "#C5A55A",
            letterSpacing: "0.1em",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#C5A55A",
            }}
          />
          CEREMONIAL GRADE · ORGANIK
        </div>

        <div
          style={{
            fontSize: "96px",
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: "24px",
            letterSpacing: "-0.03em",
          }}
        >
          macc-cino
        </div>

        <div
          style={{
            fontSize: "48px",
            fontWeight: 500,
            color: "#E0DDD3",
            marginBottom: "16px",
          }}
        >
          Matcha Konsantre
        </div>

        <div
          style={{
            fontSize: "32px",
            color: "#C5A55A",
            fontStyle: "italic",
          }}
        >
          standart · ölçeklenebilir · ekonomik
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: "80px",
            display: "flex",
            gap: "32px",
            fontSize: "22px",
            color: "#AEC59A",
          }}
        >
          <span>250ml</span>
          <span>500ml</span>
          <span>1000ml</span>
          <span>1000ml PRO</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
