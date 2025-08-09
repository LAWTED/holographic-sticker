"use client";
import HolographicSticker from "holographic-sticker";

const LawtedSticker = () => {
  return (
    <HolographicSticker.Root>
      <HolographicSticker.Controls />
      <HolographicSticker.Minimap />
      <HolographicSticker.Scene>
        {/* Lawted Wu Research Assistant Card */}
        <HolographicSticker.Card>
          {/* Layer 1: Base image */}
          <HolographicSticker.ImageLayer
            src="/Smoke.jpeg"
            alt="Smoke Background"
            parallax={true}
          />

          {/* Layer 2: Pattern holographic effect */}
          <HolographicSticker.Pattern
            textureUrl="https://assets.codepen.io/605876/figma-texture.png"
            opacity={0.4}
            mixBlendMode="multiply"
          >
            <HolographicSticker.Refraction intensity={1} />
          </HolographicSticker.Pattern>

          {/* Layer 3: Watermark effect */}
          <HolographicSticker.Watermark imageUrl="/Stanford.svg" opacity={1}>
            <HolographicSticker.Refraction intensity={1} />
          </HolographicSticker.Watermark>

          {/* Layer 4: Content with custom emboss frame */}
          <HolographicSticker.Content>
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 2,
                borderRadius: "8cqi",
                opacity: 1,
                filter: "url(#hologram-lighting)",
                clipPath: "inset(0 0 0 0 round 8cqi)",
              }}
            >
              {/* Emboss border */}
              <div
                style={{
                  position: "absolute",
                  inset: "-1px",
                  border: "calc((8cqi * 0.5) + 1px) solid hsl(0 0% 25%)",
                  borderRadius: "8cqi",
                  zIndex: 99,
                }}
              />

              {/* Copyright text */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  height: "calc(8cqi * 0.5)",
                  display: "flex",
                  alignItems: "center",
                  transform: "translateX(-50%)",
                  color: "#fff",
                  fontSize: "1.5cqi",
                  opacity: 0.8,
                  zIndex: 100,
                }}
              >
                Research © 2025
              </div>

              <div
                style={{
                  position: "absolute",
                  top: "8cqi",
                  right: "8cqi",
                  textAlign: "right",
                  letterSpacing: "-0.05em",
                  fontWeight: 1000,
                  lineHeight: 1,
                  zIndex: 100,
                  margin: 0,
                }}
              >
                <span
                  style={{
                    filter: "url(#hologram-sticker)",
                    fontSize: "10cqi",
                    display: "block",
                  }}
                >
                  Lawted Wu
                </span>
                <span
                  style={{
                    filter: "url(#hologram-sticker)",
                    fontSize: "5cqi",
                    display: "block",
                  }}
                >
                  Research Assistant
                </span>
              </div>

              {/* Stanford Logo */}
              <div
                style={{
                  position: "absolute",
                  width: "calc(8cqi * 2.75)",
                  bottom: "calc(8cqi * 0.75)",
                  left: "calc(8cqi * 0.65)",
                  zIndex: 100,
                }}
              >
                <img
                  src="/Stanford_Cardinal_logo.svg"
                  alt="Stanford University"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>

              {/* Lawted signature/logo */}
              <div
                style={{
                  position: "absolute",
                  zIndex: 100,
                  width: "38cqi",
                  bottom: "calc(8cqi * 1.1)",
                  right: "calc(8cqi * 0.6)",
                  rotate: "15deg",
                }}
              >
                <img
                  src="/lawted.svg"
                  alt="Lawted Wu Signature"
                  style={{
                    width: "100%",
                    height: "auto",
                    filter: "brightness(0) invert(1)", // 转为白色
                  }}
                />
              </div>

              {/* Portrait image */}
              <HolographicSticker.ImageLayer
                src="/Smoke-transparent.png"
                alt=""
                parallax={true}
              />
            </div>
          </HolographicSticker.Content>

          {/* Layer 5: Spotlight */}
          <HolographicSticker.Spotlight intensity={1} />

          {/* Layer 6: Glare effect */}
          <HolographicSticker.Glare />
        </HolographicSticker.Card>
      </HolographicSticker.Scene>

      {/* SVG Filters */}
      <svg className="sr-only" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="hologram-lighting">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
            <feSpecularLighting
              result="lighting"
              in="blur"
              surfaceScale="8"
              specularConstant="12"
              specularExponent="120"
              lightingColor="hsl(0 0% 6%)"
            >
              <fePointLight x="50" y="50" z="300" />
            </feSpecularLighting>
            <feComposite
              in="lighting"
              in2="SourceAlpha"
              operator="in"
              result="composite"
            />
            <feComposite
              in="SourceGraphic"
              in2="composite"
              operator="arithmetic"
              k1="0"
              k2="1"
              k3="1"
              k4="0"
              result="litPaint"
            />
          </filter>
          <filter id="hologram-sticker">
            <feMorphology
              in="SourceAlpha"
              result="dilate"
              operator="dilate"
              radius="2"
            />
            <feFlood floodColor="hsl(0 0% 100%)" result="outlinecolor" />
            <feComposite
              in="outlinecolor"
              in2="dilate"
              operator="in"
              result="outlineflat"
            />
            <feMerge result="merged">
              <feMergeNode in="outlineflat" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </HolographicSticker.Root>
  );
};

export default LawtedSticker;
