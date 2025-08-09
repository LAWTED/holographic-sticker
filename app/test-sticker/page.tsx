"use client";
import React, { useEffect, useRef, useState } from "react";
import HolographicSticker from "@/components/HolographicSticker";

const HolographicCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isExploded, setIsExploded] = useState(false);
  const [showGlare, setShowGlare] = useState(true);
  const [theme, setTheme] = useState("dark");
  const [animate, setAnimate] = useState(true);
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const minimapRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    // Simple animation sequence
    const timer = setTimeout(() => {
      setShowGlare(false);
      setIsActive(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!isActive && !isExploded) return;

      const element = isExploded ? minimapRef.current : cardRef.current;
      const bounds = element?.getBoundingClientRect();

      if (!bounds) return;

      const posX = e.clientX - bounds.x;
      const posY = e.clientY - bounds.y;
      const ratioX = posX / bounds.width - 0.5;
      const ratioY = posY / bounds.height - 0.5;
      const pointerX = Math.max(-1, Math.min(1, ratioX * 2));
      const pointerY = Math.max(-1, Math.min(1, ratioY * 2));

      setPointerPos({ x: pointerX.toFixed(2), y: pointerY.toFixed(2) });

      // Update CSS variables on document root for global access
      document.documentElement.style.setProperty("--pointer-x", pointerX);
      document.documentElement.style.setProperty("--pointer-y", pointerY);

      // Update lighting position
      const fePointLight = document.querySelector("fePointLight");
      if (fePointLight) {
        fePointLight.setAttribute("x", Math.floor(posX));
        fePointLight.setAttribute("y", Math.floor(posY));
      }
    };

    document.addEventListener("pointermove", handlePointerMove);

    // Set initial light position
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const fePointLight = document.querySelector("fePointLight");
    if (fePointLight) {
      fePointLight.setAttribute("x", centerX);
      fePointLight.setAttribute("y", centerY);
    }

    return () => document.removeEventListener("pointermove", handlePointerMove);
  }, [isActive, isExploded]);

  const handleFlip = () => {
    if (!isActive || isExploded) return;
    setIsFlipped(!isFlipped);
  };

  const toggleExplode = () => {
    setIsExploded(!isExploded);
  };

  const toggleTheme = () => {
    const themes = ["system", "light", "dark"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  // Apply theme
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Apply animate state
  useEffect(() => {
    document.documentElement.dataset.animate = animate;
  }, [animate]);

  // Apply explode state
  useEffect(() => {
    document.documentElement.dataset.explode = isExploded;
  }, [isExploded]);

  // Handle keyboard shortcut for explode
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "e" || e.key === "E") {
        toggleExplode();
      }
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => document.removeEventListener("keypress", handleKeyPress);
  }, []);

  return (
    <div className="holographic-container">
      <style>{styles}</style>

      {/* Controls Panel */}
      <div className="controls">
        <button onClick={toggleExplode} className="control-btn">
          {isExploded ? "📦 Collapse" : "💥 Explode"}
        </button>
        <button onClick={() => setAnimate(!animate)} className="control-btn">
          {animate ? "⏸️ Pause" : "▶️ Animate"}
        </button>
        <button onClick={toggleTheme} className="control-btn">
          🎨 {theme}
        </button>
      </div>

      {/* Minimap (visible when exploded) */}
      <div
        className="minimap"
        ref={minimapRef}
        onPointerMove={(e) => e.stopPropagation()}
      >
        <div className="minimap__stats">
          <span>x: {pointerPos.x}</span>
          <span>y: {pointerPos.y}</span>
        </div>
      </div>

      {/* Main scene */}
      <div className="scene" ref={sceneRef}>
        <article className="card" data-active={isActive} ref={cardRef}>
          <button
            aria-label="Flip card"
            aria-pressed={isFlipped}
            onClick={handleFlip}
          />
          <div className="card__content">
            {/* Card rear (back side) */}
            <div className="card__rear card__face">
              <img
                className="backdrop"
                src="https://assets.codepen.io/605876/techtrades-backdrop.png"
                alt=""
              />
              <div className="card__emboss">
                <div className="wordmark">
                  <img
                    src="https://assets.codepen.io/605876/techtrades-wordmark.png"
                    alt="Tech Trades"
                  />
                </div>
                <div className="wordmark">
                  <img
                    src="https://assets.codepen.io/605876/techtrades-wordmark.png"
                    alt="Tech Trades"
                  />
                </div>
                <img
                  className="gemstone"
                  src="https://assets.codepen.io/605876/techtrades-gemstone.png"
                  alt=""
                />
              </div>
              <div className="spotlight"></div>
            </div>

            {/* Card front (main side) - 完整的层级结构 */}
            <div className="card__front">
              {/* Layer 1: Base image */}
              <div className="img">
                <img src="/Smoke.jpeg" alt="" />
              </div>

              {/* Layer 2: Debug layer (first) */}
              <div className="debug">
                <div className="refraction refraction--debug"></div>
                <div className="refraction refraction--debug"></div>
              </div>

              {/* Layer 3: Debug clipped layer */}
              <div className="debug debug--clipped">
                <div className="refraction refraction--debug"></div>
                <div className="refraction refraction--debug"></div>
              </div>

              {/* Layer 4: Pattern holographic effect */}
              <div className="pattern">
                <div className="refraction"></div>
                <div className="refraction"></div>
              </div>

              {/* Layer 5: Watermark effect */}
              <div className="watermark">
                <div className="refraction"></div>
                <div className="refraction"></div>
              </div>

              {/* Layer 6: Card frame with all content */}
              <div className="card__frame card__emboss">
                <h3>
                  <span>Lawted Wu</span>
                  <br />
                  <span>Research Assistant</span>
                </h3>
                <div className="sticker ">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.4424 2C11.9459 2 12.4309 2.19736 12.834 2.54395C13.886 2.67641 14.5463 3.39492 14.9531 4.12695C14.9629 4.12666 14.973 4.12598 14.9834 4.12598C15.0672 4.12598 15.1497 4.13696 15.2295 4.15723C15.3369 4.15986 15.4444 4.17904 15.5479 4.2168C15.6375 4.24958 15.7129 4.28866 15.7754 4.32715L15.9277 4.43555L15.9336 4.44043C16.038 4.52674 16.3555 4.83697 16.5879 5.06445C16.6718 5.14653 16.7544 5.22729 16.8271 5.29883C16.9299 5.30628 17.0455 5.3149 17.1621 5.32324C17.3399 5.33596 17.5194 5.34896 17.6582 5.3584C17.8286 5.36999 17.8758 5.37207 17.8496 5.37207C18.416 5.37207 18.895 5.78432 18.9932 6.33789H18.9941C18.9944 6.33958 18.9944 6.34291 18.9951 6.34766C18.9958 6.35188 18.9964 6.35612 18.9971 6.36035C19.0447 6.66662 19.5269 9.88637 20 13.0498C20.2478 14.7065 20.4953 16.3608 20.6807 17.6006C20.7733 18.2202 20.8503 18.7364 20.9043 19.0977C20.9313 19.2783 20.9523 19.4208 20.9668 19.5176C20.974 19.5658 20.9797 19.603 20.9834 19.6279C20.9853 19.6404 20.9864 19.6499 20.9873 19.6562C20.9877 19.6592 20.988 19.6615 20.9883 19.6631L20.9893 19.665C21.0673 20.1873 20.7253 20.6805 20.209 20.791L14.7383 21.9619C14.6696 21.9766 14.5995 21.9844 14.5293 21.9844H14.5117C14.495 21.9844 14.4785 21.9823 14.4619 21.9814C14.3428 22.0034 14.2194 22.006 14.0977 21.9834L3.81738 20.0732C3.29502 19.9762 2.94007 19.4868 3.00879 18.96V18.959C3.00895 18.9578 3.00945 18.9555 3.00977 18.9531C3.01041 18.9482 3.01144 18.9403 3.0127 18.9307C3.01521 18.9114 3.0186 18.8828 3.02344 18.8457C3.03319 18.7709 3.0472 18.6612 3.06543 18.5215C3.10191 18.2419 3.15401 17.842 3.2168 17.3613C3.34242 16.3996 3.51079 15.1132 3.68066 13.8164C4.00323 11.3539 4.33802 8.80754 4.39453 8.41992L4.41992 8.2334C4.43049 8.16437 4.44351 8.09076 4.46094 8.02051C4.50083 7.85986 4.58002 7.63519 4.7666 7.42773C4.94521 7.22918 5.15029 7.12714 5.28516 7.07031C5.4127 7.01657 5.55986 6.97143 5.6748 6.93555V6.93652C5.8434 6.87969 6.26083 6.74923 6.79102 6.58789C7.01733 5.83529 7.38744 4.90112 7.94824 4.07617C8.65879 3.03094 9.79438 2.00001 11.4424 2ZM8.44141 12.6699C8.46512 12.8773 8.52598 13.0209 8.5957 13.1338C8.69653 13.297 8.84542 13.4455 9.07324 13.6338C9.25478 13.7838 9.61582 14.0528 9.86816 14.3301C10.167 14.6585 10.4423 15.1192 10.4424 15.7451C10.4424 16.2802 10.1291 16.9729 9.4668 17.2822C9.81294 17.2261 10.0876 17.0743 10.2891 16.8594C10.5485 16.5825 10.751 16.1354 10.751 15.4883C10.751 14.8598 10.4364 14.4804 9.90723 14.0674C9.7707 13.9608 9.63557 13.8637 9.4834 13.7529C9.34086 13.6492 9.17593 13.528 9.02637 13.3994C8.85891 13.2554 8.60201 13.0136 8.44141 12.6699ZM11.0898 10.1641C10.9756 10.1641 10.866 10.1687 10.7607 10.1768C10.905 10.1896 11.0421 10.2095 11.1699 10.2344L11.1934 10.167C11.1599 10.1661 11.1254 10.1641 11.0898 10.1641Z"
                      fill="#fff"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.5027 20.9843L19.9147 19.8135C19.9147 19.8135 17.9617 6.60375 17.9459 6.516C17.9324 6.429 17.8604 6.372 17.7877 6.372C17.7149 6.372 16.3409 6.27 16.3409 6.27C16.3409 6.27 15.3847 5.3145 15.2617 5.21175C15.2279 5.184 15.2054 5.169 15.1709 5.15625L14.4854 20.9843H14.5027ZM11.7824 11.4788C11.7824 11.4788 11.1749 11.1607 10.4519 11.1607C9.36669 11.1607 9.32394 11.8403 9.32394 12.0165C9.32394 12.9405 11.7539 13.3027 11.7539 15.4882C11.7539 17.2095 10.6739 18.3082 9.19944 18.3082C7.43394 18.3082 6.54444 17.2095 6.54444 17.2095L7.02894 15.645C7.02894 15.645 7.96269 16.4445 8.73894 16.4445C9.24519 16.4445 9.47019 16.0357 9.47019 15.7455C9.47019 14.5312 7.47969 14.475 7.47969 12.4763C7.45419 10.7985 8.65794 9.16425 11.0999 9.16425C12.0427 9.16425 12.5062 9.435 12.5062 9.435L11.7974 11.4713L11.7824 11.4788ZM11.3774 3.6225C11.4794 3.6225 11.5807 3.651 11.6812 3.72375C10.9432 4.0725 10.1332 4.953 9.80019 6.71775C9.30819 6.8775 8.83044 7.0215 8.38344 7.15125C8.77269 5.8125 9.71319 3.63 11.3774 3.63V3.6225ZM12.3037 5.83425V5.9355C11.7382 6.1095 11.1164 6.2985 10.5082 6.4875C10.8577 5.15475 11.5079 4.50375 12.0719 4.25925C12.2167 4.635 12.3037 5.14125 12.3037 5.83425ZM12.7079 4.15875C13.2284 4.21425 13.5637 4.809 13.7797 5.475C13.5179 5.5605 13.2284 5.64825 12.9112 5.7495V5.5605C12.9112 4.9965 12.8392 4.53225 12.7079 4.15725V4.15875ZM14.9519 5.1255C14.9369 5.1255 14.9069 5.14125 14.8934 5.14125C14.8799 5.14125 14.6767 5.1975 14.3579 5.29875C14.0407 4.374 13.4759 3.52125 12.4769 3.52125H12.3907C12.1012 3.15675 11.7517 3 11.4487 3C9.11919 3 8.00619 5.90775 7.65744 7.3845C6.76194 7.65825 6.11019 7.8615 6.03744 7.89C5.53119 8.04975 5.51694 8.064 5.45844 8.5425C5.40219 8.889 4.08594 19.0897 4.08594 19.0897L14.2567 21L14.9519 5.1255Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <img src="/Smoke-transparent.png" alt="" />
              </div>

              {/* Layer 7: Spotlight effect */}
              <div className="spotlight"></div>

              {/* Layer 8: Glare container */}
              <div className="glare-container">
                {showGlare && <div className="glare"></div>}
              </div>
            </div>
          </div>
        </article>

        {/* Holographic Sticker Component */}
        <HolographicSticker
          imageSrc="/light.png"
          imageAlt="Lightning"
        />
      </div>

      {/* SVG Filters */}
      <SvgFilters />
    </div>
  );
};

const SvgFilters = () => (
  <svg className="sr-only" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="lighting">
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
      <filter id="sticker">
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
);

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap');

/* Root variables and theme */
:root {
  --border-color: hsl(0 0% 25%);
  --card-width: 260px;
  --pointer-x: 0;
  --pointer-y: 0;
  --parallax-img-x: 5%;
  --parallax-img-y: 5%;
  --rotate-x: 25deg;
  --rotate-y: -20deg;
}

/* Base styles */
*, *::before, *::after {
  box-sizing: border-box;
  transform-style: preserve-3d;
}

body {
  margin: 0;
  padding: 0;
  background: light-dark(#000, #fff);
  min-height: 100vh;
  overflow: hidden;
  font-family: 'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue', Helvetica, Arial, sans-serif, system-ui;
}

body::before {
  --size: 45px;
  --line: color-mix(in hsl, canvasText, transparent 80%);
  content: '';
  height: 100vh;
  width: 100vw;
  position: fixed;
  background: linear-gradient(
        90deg,
        var(--line) 1px,
        transparent 1px var(--size)
      )
      calc(var(--size) * 0.36) 50% / var(--size) var(--size),
    linear-gradient(var(--line) 1px, transparent 1px var(--size)) 0%
      calc(var(--size) * 0.32) / var(--size) var(--size);
  mask: linear-gradient(-20deg, transparent 50%, white);
  top: 0;
  transform-style: flat;
  pointer-events: none;
  z-index: -1;
}

.holographic-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.controls {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 999999;
  display: flex;
  gap: 0.5rem;
  transform: translate3d(0, 0, 200vmin);
}

.control-btn {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.2s;
  font-family: 'Sora', sans-serif;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* Utilities */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Minimap */
.minimap {
  position: fixed;
  width: 60px;
  aspect-ratio: 5/7;
  background: hsl(0 0% 50%);
  top: 50%;
  left: 50%;
  translate: calc(var(--card-width) * 1) -50%;
  border-radius: 6px;
  cursor: pointer;
  border: var(--border-color) 4px solid;
  z-index: 999999;
  transform: translate3d(0, 0, 100vmin);
  pointer-events: none;
  visibility: hidden;
  transition: all 0.3s;
}

.minimap::after {
  content: 'trackpad';
  position: absolute;
  top: 50%;
  left: 100%;
  font-family: 'Sora', sans-serif;
  transform: translate(-50%, -50%) rotate(-90deg) translateY(100%);
  font-size: 0.875rem;
  pointer-events: none;
  opacity: 0.35;
}

[data-explode='true'] .minimap {
  pointer-events: all;
  visibility: visible;
}

.minimap__stats {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  opacity: 0.7;
  font-family: monospace;
  font-size: 0.75rem;
  color: white;
}

.minimap__stats span {
  white-space: nowrap;
}

/* Arrow indicator */
.arrow {
  display: inline-block;
  opacity: 0;
  position: absolute;
  font-size: 0.875rem;
  font-family: 'Gloria Hallelujah', cursive;
  transition: opacity 0.26s ease-out;
  color: white;
}

:has([data-active=true]) .arrow {
  opacity: 0.8;
}

[data-explode='true'] .arrow {
  opacity: 0;
}

.arrow.arrow--debug {
  top: 50%;
  left: 50%;
  rotate: 10deg;
  translate: calc(-40% + var(--card-width) * -1) 0;
  width: 80px;
  z-index: 99999;
}

.arrow.arrow--debug span {
  display: inline-block;
  rotate: -24deg;
  translate: 30% 100%;
}

.arrow.arrow--debug svg {
  rotate: 10deg;
  scale: 1 -1;
  translate: 120% 20%;
  rotate: -25deg;
  left: 0%;
  width: 80%;
}

@media (max-width: 580px) {
  .arrow.arrow--debug {
    translate: -50% calc(var(--card-width) * 7 / 5 * 0.5);
  }

  .arrow.arrow--debug span {
    translate: 80% 160%;
  }

  .arrow.arrow--debug svg {
    rotate: 190deg;
    top: unset;
    bottom: 100%;
    translate: 0 0;
  }
}

/* Scene */
.scene {
  perspective: 1000px;
  position: fixed;
  inset: 0;
  transform: translate3d(0, 0, 100vmin);
}

/* Card */
.card {
  --border: 8cqi;
  aspect-ratio: 5 / 7;
  width: var(--card-width);
  container-type: inline-size;
  touch-action: none;
  background: transparent;
  color: hsl(0 0% 10%);
  font-family: 'Sora', sans-serif;
  perspective: 1600px;
  position: fixed;
  top: 50%;
  left: calc(50% - 180px);
  translate: -50% -50%;
  display: block;
}


.card img,
.card *::after,
.card *::before {
  will-change: translate, scale, filter;
}

.card[data-active='true'] {
  display: block;
  transition: transform 0.2s;
}

[data-explode='false'] .card[data-active='true']:hover {
  transition: transform 0s;
  transform: rotateX(calc(var(--pointer-y) * var(--rotate-x)))
            rotateY(calc(var(--pointer-x) * var(--rotate-y)));
  animation: set backwards 0.2s;
}


@keyframes set {
  0% {
    transform: rotateX(0deg) rotateY(0deg);
  }
}

[data-explode='false'] .card[data-active='true']:hover .card__front img,
[data-explode='true']:has(.minimap:hover) .card__front img {
  transition: transform 0s;
  translate: calc(var(--pointer-x) * var(--parallax-img-x))
            calc(var(--pointer-y) * var(--parallax-img-y));
  animation: set-img backwards 0.2s;
}


@keyframes set-img {
  0% {
    translate: 0 0;
  }
}

.card:not(:hover) img {
  transition: translate 0.2s;
}

/* Card button */
.card button {
  position: absolute;
  z-index: 100;
  inset: 0;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  opacity: 0;
  background: none;
  border: none;
}

.card *:not(button) {
  pointer-events: none;
}

/* Card content */
.card__content {
  transition: rotate 0.26s ease-out;
  transform-style: preserve-3d;
  position: absolute;
  inset: 0;
  border-radius: var(--border);
}

:has([aria-pressed='true']) .card__content {
  rotate: 180deg y;
}

/* Exploded view for Card - 完整的层级分离 */
[data-explode='true'] .card {
  pointer-events: none;
  transition: transform 0.2s 0.2s;
  transform: rotateX(-24deg) rotateY(32deg) rotateX(90deg);
}

[data-explode='true'] .card .spotlight,
[data-explode='true'] .card .watermark,
[data-explode='true'] .card .pattern {
  mix-blend-mode: unset;
}

/* 所有需要分层的元素 */
[data-explode='true'] .card .watermark,
[data-explode='true'] .card .pattern,
[data-explode='true'] .card .debug,
[data-explode='true'] .card .img,
[data-explode='true'] .card .spotlight::after,
[data-explode='true'] .card .card__frame,
[data-explode='true'] .card .spotlight,
[data-explode='true'] .card .glare-container {
  transition-property: transform, opacity;
  transition-duration: 0.2s;
  transition-delay: 0.4s;
}

/* 使用CSS变量定义每层的索引，80px为层间距 */
[data-explode='true'] .card .card__front .img {
  --index: -3;
  transform: translate3d(0, 0, calc(var(--index) * 80px));
}

[data-explode='true'] .card .card__front .debug:first-of-type {
  --index: -2;
  transform: translate3d(0, 0, calc(var(--index) * 80px));
  visibility: visible;
  opacity: 0.3;
}

[data-explode='true'] .card .card__front .debug.debug--clipped {
  --index: -1.5;
  transform: translate3d(0, 0, calc(var(--index) * 80px));
  visibility: visible;
  opacity: 0.5;
}

[data-explode='true'] .card .card__front .pattern {
  --index: -1;
  transform: translate3d(0, 0, calc(var(--index) * 80px));
}

[data-explode='true'] .card .card__front .watermark {
  --index: 0;
  transform: translate3d(0, 0, calc(var(--index) * 80px));
}

[data-explode='true'] .card .card__front .card__frame {
  --index: 1;
  transform: translate3d(0, 0, calc(var(--index) * 80px));
}

[data-explode='true'] .card .card__front .spotlight {
  --index: 2;
  transform: translate3d(0, 0, calc(var(--index) * 80px));
}

[data-explode='true'] .card .card__front .glare-container {
  --index: 3;
  transform: translate3d(0, 0, calc(var(--index) * 80px));
}

[data-explode='true'] .card .debug {
  visibility: visible;
}

[data-explode='true'] .card .debug,
[data-explode='true'] .card .spotlight::after {
  opacity: 1;
}

[data-explode='true']:has(.minimap:hover) .refraction,
[data-explode='true']:has(.minimap:hover) .spotlight::before {
  opacity: 1;
}

[data-explode='true']:has(.minimap:hover) .debug:not(.debug--clipped) .refraction {
  opacity: 0.2;
}


/* All card layers */
.debug,
.img,
.pattern,
.spotlight,
.watermark,
.card__rear,
.card__emboss,
.glare-container,
.card__front {
  position: absolute;
  inset: 0;
  border-radius: var(--border);
}


/* Debug layers - 仅在爆炸视图中可见 */
.debug {
  opacity: 0;
  visibility: hidden;
}

.debug::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 4px dashed canvasText;
  border-radius: var(--border);
}

.debug.debug--clipped {
  clip-path: inset(0 0 0 0 round var(--border));
}

.debug.debug--clipped .refraction {
  opacity: 1;
}

.debug .refraction {
  opacity: 0.2;
}

/* 爆炸视图中debug层的特殊显示 */
[data-explode='true'] .card .debug:not(.debug--clipped) .refraction {
  opacity: 0.2;
}

[data-explode='true'] .card .debug.debug--clipped .refraction {
  opacity: 0.4;
}


/* Card faces */
.card__front,
.card__rear {
  backface-visibility: hidden;
}

.card__front > *:not(.debug:not(.debug--clipped)) {
  clip-path: inset(0 0 0 0 round var(--border));
}

.card__rear {
  clip-path: inset(0 0 0 0 round var(--border));
  --border-color: oklch(28.55% 0.09665440679544547 265.51146531290146);
  transform-style: preserve-3d;
  position: absolute;
  inset: 0;
  background: color-mix(in oklch, var(--border-color), #000);
  transform: rotateY(180deg) translate3d(0, 0, 1px);
}

/* Card emboss */
.card__emboss {
  filter: url(#lighting);
  position: absolute;
  inset: 0;
  border-radius: var(--border);
  clip-path: inset(0 0 0 0 round var(--border));
}

.card__emboss::before {
  content: 'TechTrades © 2025';
  position: absolute;
  bottom: 0;
  left: 50%;
  height: calc(var(--border) * 0.5);
  display: flex;
  place-items: center;
  translate: -50% 0;
  color: #fff;
  font-size: 1.5cqi;
  opacity: 0.8;
  z-index: 100;
}

.card__emboss::after {
  content: '';
  position: absolute;
  inset: -1px;
  border: calc((var(--border) * 0.5) + 1px) solid var(--border-color);
  border-radius: var(--border);
  z-index: 99;
}

/* Images */
.card__rear > img,
.card__front > .img img {
  width: 100%;
  object-fit: cover;
  height: 100%;
  scale: 1.1;
  position: absolute;
  inset: 0;
}

.card__front .img::before {
  content: '';
  position: absolute;
  inset: 0;
  background: hsl(0 0% 50%);
}

.img img {
  filter: brightness(0.85);
  opacity: 1;
}

/* Card frame */
.card__frame {
  position: absolute;
  inset: 0;
  z-index: 2;
  border-radius: var(--border);
}

.card__frame * {
  will-change: translate, scale, filter;
}

.card__frame h3 {
  margin: 0;
  top: var(--border);
  right: var(--border);
  text-align: right;
  letter-spacing: -0.05em;
  font-weight: 1000;
  line-height: 1;
  z-index: 100;
  position: absolute;
}

.card__frame h3 span {
  filter: url(#sticker);
}


.card__frame h3 span:first-of-type {
  font-size: 10cqi;
}

.card__frame h3 span:last-of-type {
  font-size: 5cqi;
}

.card__frame img {
  width: 100%;
  object-fit: cover;
  height: 100%;
  scale: 1.1;
  position: absolute;
  inset: 0;
  filter: saturate(0.8) contrast(1.2) drop-shadow(0 0 10cqi hsl(0 0% 10% / 0.75));
}

/* Sticker */
.sticker {
  position: absolute;
  width: calc(var(--border) * 2.75);
  bottom: calc(var(--border) * 0.75);
  left: calc(var(--border) * 0.65);
  z-index: 100;
}

/* Pattern and watermark */
.pattern,
.watermark {
  filter: saturate(0.8) contrast(1) brightness(1);
  mask: url(https://assets.codepen.io/605876/figma-texture.png) 50% 50% / 4cqi 4cqi;
  opacity: 0.4;
  mix-blend-mode: multiply;
}

.pattern::before {
  content: '';
  position: absolute;
  inset: 0;
  background: hsl(0 0% 80%);
}

.watermark {
  filter: saturate(0.9) contrast(1.1) brightness(1.2);
  mask: url(/Stanford.svg) 50% 50% / 14cqi 14cqi repeat;
  opacity: 1;
  mix-blend-mode: hard-light;
}

.watermark::before {
  content: '';
  position: absolute;
  inset: 0;
  background: hsl(0 0% 100% / 0.2);
}

/* Refraction effects */
.refraction,
.spotlight::before {
  opacity: 0;
  transition: opacity 0.2s ease-out;
}

.card[data-active='true']:hover :not(.debug) .refraction,
.card[data-active='true']:hover .spotlight::before {
  opacity: 1;
}


.refraction {
  position: absolute;
  width: 500%;
  aspect-ratio: 1 / 1;
  bottom: 0;
  left: 0;
  filter: saturate(2);
  will-change: translate, scale, filter;
  background: radial-gradient(
    circle at 0 100%,
    transparent 10%,
    hsl(5 100% 80%),
    hsl(150 100% 60%),
    hsl(220 90% 70%),
    transparent 60%
  );
  transform-origin: 0 100%;
  scale: min(1, calc(0.15 + var(--pointer-x) * 0.25));
  translate: clamp(-10%, calc(-10% + var(--pointer-x) * 10%), 10%)
            calc(max(0%, var(--pointer-y) * -1 * 10%));
}

.refraction:nth-of-type(2) {
  bottom: unset;
  top: 0;
  left: unset;
  right: 0;
  scale: min(1, calc(0.15 + var(--pointer-x) * -0.65));
  translate: clamp(-10%, calc(10% - var(--pointer-x) * -10%), 10%)
            calc(min(0%, var(--pointer-y) * -10%));
  transform-origin: 100% 0;
  background: radial-gradient(
    circle at 100% 0,
    transparent 10%,
    hsl(5 100% 80%),
    hsl(150 100% 60%),
    hsl(220 90% 70%),
    transparent 60%
  );
}

/* Glare effect */
.glare {
  position: absolute;
  opacity: 0.5;
  inset: 0;
  background: linear-gradient(
    -65deg,
    transparent 0 40%,
    #fff 40% 50%,
    transparent 30% 50%,
    transparent 50% 55%,
    #fff 55% 60%,
    transparent 60% 100%
  );
  transform: translateX(100%);
  animation: glareSwipe 0.65s 0.75s ease-in-out forwards;
}

@keyframes glareSwipe {
  to {
    transform: translateX(-100%);
  }
}

/* Spotlight */
.spotlight {
  mix-blend-mode: overlay;
  z-index: 9999999;
  clip-path: inset(0 0 0 0 round var(--border));
}

.spotlight::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0;
  border: 4px dashed canvasText;
  border-radius: var(--border);
}

.spotlight::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 500%;
  opacity: 0;
  aspect-ratio: 1;
  background: radial-gradient(
    hsl(0 0% 100% / 0.4) 0 2%,
    hsl(0 0% 10% / 0.2) 20%
  );
  filter: brightness(1.2) contrast(1.2);
  translate: calc(-50% + var(--pointer-x) * 20%)
            calc(-50% + var(--pointer-y) * 20%);
  z-index: 99999;
}

/* Wordmarks */
.wordmark {
  position: absolute;
  width: 70%;
  left: 50%;
  translate: -50% 0;
  top: 12%;
  height: max-content;
}

.wordmark::after {
  content: '™';
  position: absolute;
  top: 100%;
  right: 0;
  color: #fff;
}

.wordmark:last-of-type {
  top: unset;
  bottom: 12%;
  rotate: 180deg;
}

.wordmark img {
  position: static;
  width: 100%;
  height: auto;
}

/* Gemstone */
.gemstone {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  height: auto;
  translate: -50% -50%;
  filter: hue-rotate(320deg);
}

/* Initial animations */
.glare,
.card__front img,
.watermark {
  opacity: 0;
}

.card h3,
.sticker {
  opacity: 1;
}

[data-active='true'] .watermark {
  animation: fadeIn 0.5s 1.4s forwards;
}

[data-active='true'] .card__front img {
  animation: fadeIn 0.5s 1.4s forwards;
  opacity: 1;
}

[data-active='true'] .sticker {
  animation: fadeIn 0.5s 1.9s forwards;
}

[data-active='true'] .card h3 {
  animation: fadeIn 0.5s 2.2s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}







`;

export default HolographicCard;
