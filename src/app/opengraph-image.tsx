import { ImageResponse } from "next/og";

export const alt = "Sunset";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #fafaf9 0%, #fecdd3 100%)",
      }}
    >
      <div
        style={{
          fontSize: 28,
          letterSpacing: 10,
          textTransform: "uppercase",
          color: "#a8a29e",
          marginBottom: 28,
        }}
      >
        Sunset
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 88,
          fontFamily: "serif",
          color: "#292524",
        }}
      >
        Para ti
        <span style={{ color: "#fb7185", marginLeft: 24 }}>🌷</span>
      </div>
    </div>,
    { ...size },
  );
}
