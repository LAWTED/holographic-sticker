"use client";
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  forwardRef,
} from "react";

// Context for sharing state between components
const HologramContext = createContext({});

// Hook to use the hologram context
const useHologram = () => {
  const context = useContext(HologramContext);
  if (!context) {
    throw new Error(
      "Hologram components must be used within HologramSticker.Root"
    );
  }
  return context;
};

// Root component that provides context
const Root = ({ children, className = "", theme = "dark", ...props }) => {
  const [isActive, setIsActive] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExploded, setIsExploded] = useState(false);
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });
  const [showGlare, setShowGlare] = useState(true);
  const cardRef = useRef(null);
  const minimapRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    // Match original GSAP timeline delays
    const totalDelay =
      750 + 650 + 500 + 500 + 300 + 800 + 100 + 100 + 100 + 200;

    const timer = setTimeout(() => {
      setShowGlare(false);
      setIsActive(true);
    }, totalDelay);

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

      // Update CSS variables globally
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

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.explode = isExploded;
  }, [theme, isExploded]);

  return (
    <HologramContext.Provider
      value={{
        isActive,
        isFlipped,
        setIsFlipped,
        isExploded,
        setIsExploded,
        pointerPos,
        showGlare,
        cardRef,
        minimapRef,
        sceneRef,
      }}
    >
      <div
        className={`hologram-root ${className}`}
        data-explode={isExploded}
        {...props}
      >
        <style>{styles}</style>
        {children}
      </div>
    </HologramContext.Provider>
  );
};

// Scene component - wrapper for 3D perspective
const Scene = forwardRef(({ children, className = "", ...props }, ref) => {
  const { sceneRef } = useHologram();

  return (
    <div
      ref={ref || sceneRef}
      className={`hologram-scene ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

// Card component - main container
const Card = forwardRef(
  ({ children, className = "", onFlip, ...props }, ref) => {
    const { isActive, isFlipped, setIsFlipped, isExploded, cardRef } =
      useHologram();

    const handleFlip = () => {
      if (!isActive || isExploded) return;
      setIsFlipped(!isFlipped);
      onFlip?.(!isFlipped);
    };

    return (
      <article
        ref={ref || cardRef}
        className={`hologram-card ${className} ${isActive ? "active" : ""} ${
          isExploded ? "exploded" : ""
        }`}
        data-active={isActive}
        data-flipped={isFlipped}
        {...props}
      >
        <button
          className="hologram-flip-button"
          aria-label="Flip card"
          aria-pressed={isFlipped}
          onClick={handleFlip}
        />
        <div className={`hologram-content ${isFlipped ? "flipped" : ""}`}>
          {children}
        </div>
      </article>
    );
  }
);

// Arrow indicator component
const Arrow = ({ className = "", ...props }) => {
  const { isActive, isExploded } = useHologram();

  return (
    <span
      className={`hologram-arrow ${className} ${
        isActive && !isExploded ? "visible" : ""
      }`}
      {...props}
    >
      <span>:hover, tap, drag</span>
      <svg viewBox="0 0 122 97" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M116.102 0.0996005C114.952 0.334095 112.7 1.53002 111.433 2.53834C110.869 2.98388 109.368 4.15635 108.077 5.11778C103.455 8.6352 102.61 9.40903 102.187 10.4877C101.39 12.5982 102.798 14.5914 105.097 14.5914C106.13 14.5914 108.241 13.7941 109.696 12.8561C110.424 12.3871 111.01 12.0823 111.01 12.1526C111.01 12.692 107.796 17.8274 106.2 19.8206C102.023 25.0733 95.6642 29.6928 86.2548 34.2889C81.0926 36.8214 77.4555 38.2753 73.9123 39.2367C71.7066 39.823 70.6507 39.9871 67.9053 40.0809C66.0516 40.1513 64.5499 40.1747 64.5499 40.1278C64.5499 40.0809 64.808 38.9788 65.1365 37.6891C65.465 36.3993 65.8404 34.1716 66.0047 32.7647C66.4505 28.3796 65.4884 24.2994 63.4704 22.2359C62.1564 20.8758 60.9363 20.3599 59.0121 20.3599C57.6043 20.3599 57.1115 20.4537 55.7975 21.1103C52.8878 22.5407 50.5648 25.9878 49.5089 30.4197C48.453 34.922 49.2742 38.0877 52.3481 41.1127C53.4744 42.2148 54.46 42.9183 55.9852 43.6921C57.1584 44.2549 58.1439 44.7473 58.1909 44.7708C58.5898 45.0053 54.5304 53.4705 52.0666 57.6211C47.4674 65.3125 39.3486 74.575 30.5728 82.0789C22.2427 89.2309 16.7285 92.4435 9.87677 94.1553C8.28116 94.554 7.13138 94.6478 4.2452 94.6478C1.17131 94.6712 0.608154 94.7181 0.608154 95.023C0.608154 95.234 1.19478 95.5857 2.13337 95.9609C3.54126 96.4768 3.96363 96.5472 7.41296 96.5237C10.5572 96.5237 11.4724 96.4299 13.1149 96.0078C21.7265 93.6863 31.1594 87.1908 42.6102 75.7006C49.2977 69.0175 52.5828 64.9373 56.1494 58.9343C58.0501 55.7217 60.6312 50.6801 61.7575 47.9365L62.5553 45.9902L64.0806 46.1543C71.3547 46.9047 77.7136 45.3101 88.3667 40.034C96.2274 36.1414 101.976 32.3426 106.505 28.0748C108.617 26.0816 111.855 22.2828 112.794 20.7117C113.028 20.313 113.286 19.9847 113.357 19.9847C113.427 19.9847 113.662 20.782 113.873 21.72C114.084 22.6814 114.647 24.276 115.093 25.2609C115.82 26.8085 116.008 27.043 116.454 26.9727C116.876 26.9258 117.228 26.4333 117.956 24.9795C119.317 22.2828 119.833 20.2661 120.772 13.8879C121.757 7.25168 121.781 4.4143 120.889 2.56179C119.95 0.615488 118.12 -0.322489 116.102 0.0996005ZM60.7016 25.7767C61.4525 26.9023 61.8279 29.2942 61.6637 31.9205C61.4759 34.7813 60.5139 38.9788 60.0681 38.9788C59.5284 38.9788 57.1584 37.6422 56.2198 36.8214C54.8354 35.6021 54.3426 34.2889 54.5538 32.2957C54.8589 29.2473 56.1964 26.2223 57.5808 25.3547C58.7306 24.6512 60.0681 24.8388 60.7016 25.7767Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
};

// Minimap component for exploded view
const Minimap = ({ className = "", ...props }) => {
  const { minimapRef, pointerPos, isExploded } = useHologram();

  return (
    <div
      ref={minimapRef}
      className={`hologram-minimap ${className} ${isExploded ? "visible" : ""}`}
      {...props}
    >
      <div className="hologram-minimap__stats">
        <span>x: {pointerPos.x}</span>
        <span>y: {pointerPos.y}</span>
      </div>
    </div>
  );
};

// Background component for card back
const Background = ({ children, className = "", ...props }) => {
  return (
    <div className={`hologram-background ${className}`} {...props}>
      {children}
    </div>
  );
};

// Front face container
const Front = ({ children, className = "", ...props }) => {
  return (
    <div className={`hologram-front ${className}`} {...props}>
      {children}
    </div>
  );
};

// Back face container
const Back = ({ children, className = "", emboss = true, ...props }) => {
  return (
    <div
      className={`hologram-back ${
        emboss ? "hologram-emboss" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Image layer component
const ImageLayer = ({ src, alt = "", className = "", ...props }) => {
  const { isActive } = useHologram();

  return (
    <div
      className={`hologram-img-layer ${className} ${isActive ? "active" : ""}`}
      {...props}
    >
      <img src={src} alt={alt} />
    </div>
  );
};

// Debug layer component
const DebugLayer = ({ variant = "default", className = "", ...props }) => {
  const { isExploded } = useHologram();

  return (
    <div
      className={`hologram-debug ${
        variant === "clipped" ? "hologram-debug--clipped" : ""
      } ${className}`}
      data-visible={isExploded}
      {...props}
    >
      <div className="hologram-refraction hologram-refraction--debug"></div>
      <div className="hologram-refraction hologram-refraction--debug"></div>
    </div>
  );
};

// Pattern component for holographic effects
const Pattern = ({
  children,
  imageUrl,
  className = "",
  opacity = 0.4,
  ...props
}) => {
  const { isActive } = useHologram();
  const style = imageUrl
    ? {
        "--pattern-url": `url(${imageUrl})`,
        "--pattern-opacity": opacity,
      }
    : { "--pattern-opacity": opacity };

  return (
    <div
      className={`hologram-pattern ${className} ${isActive ? "active" : ""}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

// Watermark component
const Watermark = ({
  children,
  imageUrl,
  className = "",
  opacity = 1,
  ...props
}) => {
  const { isActive } = useHologram();
  const style = imageUrl
    ? {
        "--watermark-url": `url(${imageUrl})`,
        "--watermark-opacity": opacity,
      }
    : { "--watermark-opacity": opacity };

  return (
    <div
      className={`hologram-watermark ${className} ${isActive ? "active" : ""}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

// Refraction effect component
const Refraction = ({ className = "", intensity = 1, ...props }) => {
  return (
    <>
      <div
        className={`hologram-refraction hologram-refraction-1 ${className}`}
        style={{ "--intensity": intensity }}
        {...props}
      />
      <div
        className={`hologram-refraction hologram-refraction-2 ${className}`}
        style={{ "--intensity": intensity }}
        {...props}
      />
    </>
  );
};

// Frame component with emboss effect
const Frame = ({ children, className = "", emboss = true, ...props }) => {
  const { isActive } = useHologram();

  return (
    <div
      className={`hologram-frame ${
        emboss ? "hologram-emboss" : ""
      } ${className} ${isActive ? "active" : ""}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Spotlight effect component
const Spotlight = ({ className = "", intensity = 1, ...props }) => {
  const { isActive } = useHologram();

  return (
    <div
      className={`hologram-spotlight ${className} ${isActive ? "active" : ""}`}
      style={{ "--spotlight-intensity": intensity }}
      {...props}
    />
  );
};

// Glare effect component
const Glare = ({ className = "", animate = true, ...props }) => {
  const { isActive, showGlare } = useHologram();

  if (!showGlare && animate) return null;

  return (
    <div className={`hologram-glare-container ${className}`} {...props}>
      <div
        className={`hologram-glare ${animate && !isActive ? "animate" : ""}`}
      />
    </div>
  );
};

// Controls component
const Controls = ({
  className = "",
  showTheme = true,
  showAnimate = true,
  ...props
}) => {
  const { isExploded, setIsExploded } = useHologram();
  const [theme, setTheme] = useState("dark");
  const [animate, setAnimate] = useState(true);

  const toggleTheme = () => {
    const themes = ["system", "light", "dark"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
    document.documentElement.dataset.theme = themes[nextIndex];
  };

  return (
    <div className={`hologram-controls ${className}`} {...props}>
      <button
        onClick={() => setIsExploded(!isExploded)}
        className="hologram-control-btn"
      >
        {isExploded ? "📦 Collapse" : "💥 Explode"}
      </button>
      {showAnimate && (
        <button
          onClick={() => setAnimate(!animate)}
          className="hologram-control-btn"
        >
          {animate ? "⏸️ Pause" : "▶️ Animate"}
        </button>
      )}
      {showTheme && (
        <button onClick={toggleTheme} className="hologram-control-btn">
          🎨 {theme}
        </button>
      )}
    </div>
  );
};

// Wordmark component for card back
const Wordmark = ({
  src,
  alt = "",
  position = "top",
  className = "",
  ...props
}) => {
  return (
    <div
      className={`hologram-wordmark hologram-wordmark--${position} ${className}`}
      {...props}
    >
      <img src={src} alt={alt} />
    </div>
  );
};

// Gemstone component for card back
const Gemstone = ({ src, alt = "", className = "", ...props }) => {
  return (
    <img
      className={`hologram-gemstone ${className}`}
      src={src}
      alt={alt}
      {...props}
    />
  );
};

// SVG Filters component
const Filters = () => (
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
);

// Export as compound component
const HologramSticker = {
  Root,
  Scene,
  Card,
  Arrow,
  Minimap,
  Background,
  Front,
  Back,
  ImageLayer,
  DebugLayer,
  Pattern,
  Watermark,
  Refraction,
  Frame,
  Spotlight,
  Glare,
  Controls,
  Wordmark,
  Gemstone,
  Filters,
};

// CSS Styles
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap');

/* Root variables */
:root {
  --card-width: 260px;
  --card-border-radius: 8cqi;
  --pointer-x: 0;
  --pointer-y: 0;
  --parallax-img-x: 5%;
  --parallax-img-y: 5%;
  --rotate-x: 25deg;
  --rotate-y: -20deg;
  --border-color: hsl(0 0% 25%);
}

/* Theme support */
html {
  color-scheme: light dark;
}

[data-theme='light'] {
  color-scheme: light only;
}

[data-theme='dark'] {
  color-scheme: dark only;
}

/* Base styles */
*, *::before, *::after {
  box-sizing: border-box;
  transform-style: preserve-3d;
}

body {
  margin: 0;
  padding: 0;
  background: light-dark(#fff, #000);
  min-height: 100vh;
  overflow: hidden;
  font-family: 'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue', Helvetica, Arial, sans-serif, system-ui;
}

/* Background grid */
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

/* Root container */
.hologram-root {
  position: relative;
  width: 100%;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Scene */
.hologram-scene {
  perspective: 1000px;
  position: relative;
  transform: translate3d(0, 0, 100vmin);
}

/* Arrow indicator */
.hologram-arrow {
  display: inline-block;
  opacity: 0;
  position: absolute;
  font-size: 0.875rem;
  font-family: 'Gloria Hallelujah', cursive;
  transition: opacity 0.26s ease-out;
  color: white;
  top: 50%;
  left: 50%;
  rotate: 10deg;
  translate: calc(-40% + var(--card-width) * -1) 0;
  width: 80px;
  z-index: 99999;
}

.hologram-arrow.visible {
  opacity: 0.8;
}

.hologram-arrow span {
  display: inline-block;
  rotate: -24deg;
  translate: 30% 100%;
}

.hologram-arrow svg {
  rotate: 10deg;
  scale: 1 -1;
  translate: 120% 20%;
  rotate: -25deg;
  left: 0%;
  width: 80%;
}

[data-explode='true'] .hologram-arrow {
  opacity: 0;
}

@media (max-width: 580px) {
  .hologram-arrow {
    translate: -50% calc(var(--card-width) * 7 / 5 * 0.5);
  }

  .hologram-arrow span {
    translate: 80% 160%;
  }

  .hologram-arrow svg {
    rotate: 190deg;
    top: unset;
    bottom: 100%;
    translate: 0 0;
  }
}

/* Minimap */
.hologram-minimap {
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

.hologram-minimap.visible {
  pointer-events: all;
  visibility: visible;
}

.hologram-minimap::after {
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

.hologram-minimap__stats {
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

.hologram-minimap__stats span {
  white-space: nowrap;
}

/* Card */
.hologram-card {
  aspect-ratio: 5 / 7;
  width: var(--card-width);
  container-type: inline-size;
  background: transparent;
  color: hsl(0 0% 10%);
  font-family: 'Sora', sans-serif;
  perspective: 1600px;
  position: relative;
  display: block;
}

.hologram-card img,
.hologram-card *::after,
.hologram-card *::before {
  will-change: translate, scale, filter;
}

.hologram-card.active {
  transition: transform 0.2s;
}

[data-explode='false'] .hologram-card.active:hover {
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

.hologram-card:not(:hover) img {
  transition: translate 0.2s;
}

/* Exploded view */
.hologram-card.exploded {
  pointer-events: none;
  transition: transform 0.2s 0.2s;
  transform: rotateX(-24deg) rotateY(32deg) rotateX(90deg);
}

[data-explode='true'] .hologram-card .hologram-spotlight,
[data-explode='true'] .hologram-card .hologram-watermark,
[data-explode='true'] .hologram-card .hologram-pattern {
  mix-blend-mode: unset;
}

/* Flip button */
.hologram-flip-button {
  position: absolute;
  z-index: 100;
  inset: 0;
  cursor: pointer;
  opacity: 0;
  background: none;
  border: none;
  -webkit-tap-highlight-color: transparent;
}

/* Content wrapper */
.hologram-content {
  transition: rotate 0.26s ease-out;
  transform-style: preserve-3d;
  position: absolute;
  inset: 0;
  border-radius: var(--card-border-radius);
}

.hologram-content.flipped {
  rotate: 180deg y;
}

/* Card faces */
.hologram-front,
.hologram-back {
  position: absolute;
  inset: 0;
  border-radius: var(--card-border-radius);
  backface-visibility: hidden;
}

.hologram-front > *:not(.hologram-debug:not(.hologram-debug--clipped)) {
  clip-path: inset(0 0 0 0 round var(--card-border-radius));
}

.hologram-back {
  --back-color: oklch(28.55% 0.09665440679544547 265.51146531290146);
  transform: rotateY(180deg) translate3d(0, 0, 1px);
  background: color-mix(in oklch, var(--back-color), #000);
  clip-path: inset(0 0 0 0 round var(--card-border-radius));
  transform-style: preserve-3d;
}

/* Emboss effect */
.hologram-emboss {
  filter: url(#hologram-lighting);
  position: relative;
}

.hologram-emboss::before {
  content: 'TechTrades © 2025';
  position: absolute;
  bottom: 0;
  left: 50%;
  height: calc(var(--card-border-radius) * 0.5);
  display: flex;
  place-items: center;
  translate: -50% 0;
  color: #fff;
  font-size: 1.5cqi;
  opacity: 0.8;
  z-index: 100;
}

.hologram-emboss::after {
  content: '';
  position: absolute;
  inset: -1px;
  border: calc((var(--card-border-radius) * 0.5) + 1px) solid var(--border-color);
  border-radius: var(--card-border-radius);
  z-index: 99;
}

/* Background */
.hologram-background {
  position: absolute;
  inset: 0;
  border-radius: var(--card-border-radius);
}

.hologram-background img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--card-border-radius);
}

/* Image layer */
.hologram-img-layer {
  position: absolute;
  inset: 0;
  border-radius: var(--card-border-radius);
  clip-path: inset(0 0 0 0 round var(--card-border-radius));
  opacity: 0;
  transition: opacity 0.5s 1.4s;
}

.hologram-img-layer::before {
  content: '';
  position: absolute;
  inset: 0;
  background: hsl(0 0% 50%);
}

.hologram-img-layer.active {
  opacity: 1;
}

.hologram-img-layer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  scale: 1.1;
  filter: brightness(0.85);
  transition: translate 0.2s;
  position: absolute;
  inset: 0;
}

[data-explode='false'] .hologram-card.active:hover .hologram-img-layer img,
[data-explode='true']:has(.hologram-minimap:hover) .hologram-img-layer img {
  transition: transform 0s;
  translate: calc(var(--pointer-x) * var(--parallax-img-x))
            calc(var(--pointer-y) * var(--parallax-img-y));
  animation: set-img backwards 0.2s;
}

[data-explode='false'] .hologram-card.active:hover .hologram-frame img,
[data-explode='true']:has(.hologram-minimap:hover) .hologram-frame img {
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

/* Debug layers */
.hologram-debug {
  position: absolute;
  inset: 0;
  border-radius: var(--card-border-radius);
  opacity: 0;
  visibility: hidden;
}

.hologram-debug[data-visible="true"] {
  visibility: visible;
}

.hologram-debug::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 4px dashed canvasText;
  border-radius: var(--card-border-radius);
}

.hologram-debug--clipped {
  clip-path: inset(0 0 0 0 round var(--card-border-radius));
}

.hologram-debug .hologram-refraction--debug {
  opacity: 0.2;
}

.hologram-debug--clipped .hologram-refraction--debug {
  opacity: 1;
}

[data-explode='true'] .hologram-debug {
  visibility: visible;
}

[data-explode='true'] .hologram-debug:not(.hologram-debug--clipped) .hologram-refraction--debug {
  opacity: 0.2;
}

/* Pattern */
.hologram-pattern {
  position: absolute;
  inset: 0;
  border-radius: var(--card-border-radius);
  filter: saturate(0.8) contrast(1) brightness(1);
  mask: var(--pattern-url, url(https://assets.codepen.io/605876/figma-texture.png)) 50% 50% / 4cqi 4cqi;
  opacity: var(--pattern-opacity, 0.4);
  mix-blend-mode: multiply;
  clip-path: inset(0 0 0 0 round var(--card-border-radius));
}

.hologram-pattern::before {
  content: '';
  position: absolute;
  inset: 0;
  background: hsl(0 0% 80%);
}

/* Watermark */
.hologram-watermark {
  position: absolute;
  inset: 0;
  border-radius: var(--card-border-radius);
  filter: saturate(0.9) contrast(1.1) brightness(1.2);
  mask: var(--watermark-url, url(https://assets.codepen.io/605876/shopify-pattern.svg)) 50% 50% / 14cqi 14cqi repeat;
  opacity: 0;
  mix-blend-mode: hard-light;
  clip-path: inset(0 0 0 0 round var(--card-border-radius));
  transition: opacity 0.5s 1.4s;
}

.hologram-watermark.active {
  opacity: var(--watermark-opacity, 1);
}

.hologram-watermark::before {
  content: '';
  position: absolute;
  inset: 0;
  background: hsl(0 0% 100% / 0.2);
}

/* Refraction effects */
.hologram-refraction,
.hologram-spotlight::before {
  opacity: 0;
  transition: opacity 0.2s ease-out;
}

[data-explode='true']:has(.hologram-minimap:hover) .hologram-refraction,
[data-explode='true']:has(.hologram-minimap:hover) .hologram-spotlight::before,
.hologram-card.active:hover :not(.hologram-debug) .hologram-refraction,
.hologram-card.active:hover .hologram-spotlight::before {
  opacity: 1;
}

[data-explode='true']:has(.hologram-minimap:hover) .hologram-debug:not(.hologram-debug--clipped) .hologram-refraction {
  opacity: 0.2;
}

.hologram-refraction {
  position: absolute;
  width: 500%;
  aspect-ratio: 1 / 1;
  filter: saturate(calc(2 * var(--intensity, 1)));
  will-change: translate, scale, filter;
}

.hologram-refraction-1 {
  bottom: 0;
  left: 0;
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

.hologram-refraction-2 {
  top: 0;
  right: 0;
  background: radial-gradient(
    circle at 100% 0,
    transparent 10%,
    hsl(5 100% 80%),
    hsl(150 100% 60%),
    hsl(220 90% 70%),
    transparent 60%
  );
  transform-origin: 100% 0;
  scale: min(1, calc(0.15 + var(--pointer-x) * -0.65));
  translate: clamp(-10%, calc(10% - var(--pointer-x) * -10%), 10%)
            calc(min(0%, var(--pointer-y) * -10%));
}

/* Frame */
.hologram-frame {
  position: absolute;
  inset: 0;
  z-index: 2;
  border-radius: var(--card-border-radius);
  opacity: 0;
  transition: opacity 0.5s 2.2s;
}

.hologram-frame.active {
  opacity: 1;
}

.hologram-frame img {
  width: 100%;
  object-fit: cover;
  height: 100%;
  scale: 1.1;
  position: absolute;
  inset: 0;
  filter: saturate(0.8) contrast(1.2) drop-shadow(0 0 10cqi hsl(0 0% 10% / 0.75));
}

/* Spotlight */
.hologram-spotlight {
  position: absolute;
  inset: 0;
  mix-blend-mode: overlay;
  z-index: 10;
  clip-path: inset(0 0 0 0 round var(--card-border-radius));
}

.hologram-spotlight::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0;
  border: 4px dashed canvasText;
  border-radius: var(--card-border-radius);
}

[data-explode='true'] .hologram-spotlight::after {
  opacity: 1;
}

.hologram-spotlight::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 500%;
  opacity: 0;
  aspect-ratio: 1;
  background: radial-gradient(
    hsl(0 0% 100% / calc(0.4 * var(--spotlight-intensity, 1))) 0 2%,
    hsl(0 0% 10% / calc(0.2 * var(--spotlight-intensity, 1))) 20%
  );
  filter: brightness(1.2) contrast(1.2);
  translate: calc(-50% + var(--pointer-x) * 20%)
            calc(-50% + var(--pointer-y) * 20%);
  transition: opacity 0.2s ease-out;
}

/* Glare */
.hologram-glare-container {
  position: absolute;
  inset: 0;
  border-radius: var(--card-border-radius);
  overflow: hidden;
  clip-path: inset(0 0 0 0 round var(--card-border-radius));
}

.hologram-glare {
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
}

.hologram-glare.animate {
  animation: glareSwipe 0.65s 0.75s ease-in-out forwards;
}

@keyframes glareSwipe {
  to {
    transform: translateX(-100%);
  }
}

/* Wordmarks */
.hologram-wordmark {
  position: absolute;
  width: 70%;
  left: 50%;
  translate: -50% 0;
  height: max-content;
}

.hologram-wordmark--top {
  top: 12%;
}

.hologram-wordmark--bottom {
  bottom: 12%;
  rotate: 180deg;
}

.hologram-wordmark::after {
  content: '™';
  position: absolute;
  top: 100%;
  right: 0;
  color: #fff;
}

.hologram-wordmark img {
  position: static;
  width: 100%;
  height: auto;
}

/* Gemstone */
.hologram-gemstone {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  height: auto;
  translate: -50% -50%;
  filter: hue-rotate(320deg);
}

/* Controls */
.hologram-controls {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 999999;
  display: flex;
  gap: 0.5rem;
  transform: translate3d(0, 0, 200vmin);
}

.hologram-control-btn {
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

.hologram-control-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* Exploded view animations - Complete 8 layer structure */
[data-explode='true'] .hologram-img-layer,
[data-explode='true'] .hologram-debug,
[data-explode='true'] .hologram-pattern,
[data-explode='true'] .hologram-watermark,
[data-explode='true'] .hologram-frame,
[data-explode='true'] .hologram-spotlight,
[data-explode='true'] .hologram-spotlight::after,
[data-explode='true'] .hologram-glare-container {
  transition-property: transform, opacity;
  transition-duration: 0.2s;
  transition-delay: 0.4s;
}

/* Layer 1: Image base layer */
[data-explode='true'] .hologram-img-layer {
  transform: translate3d(0, 0, -240px);
}

/* Layer 2: Debug layer (first) */
[data-explode='true'] .hologram-debug:not(.hologram-debug--clipped) {
  transform: translate3d(0, 0, -160px);
  opacity: 0.3;
}

/* Layer 3: Debug clipped layer */
[data-explode='true'] .hologram-debug--clipped {
  transform: translate3d(0, 0, -120px);
  opacity: 0.5;
}

/* Layer 4: Pattern holographic layer */
[data-explode='true'] .hologram-pattern {
  transform: translate3d(0, 0, -80px);
}

/* Layer 5: Watermark layer */
[data-explode='true'] .hologram-watermark {
  transform: translate3d(0, 0, 0px);
}

/* Layer 6: Frame layer */
[data-explode='true'] .hologram-frame {
  transform: translate3d(0, 0, 80px);
}

/* Layer 7: Spotlight layer */
[data-explode='true'] .hologram-spotlight {
  transform: translate3d(0, 0, 160px);
}

/* Layer 8: Glare container layer */
[data-explode='true'] .hologram-glare-container {
  transform: translate3d(0, 0, 240px);
}

/* Initial animation states */
.hologram-arrow {
  animation: fadeInArrow 0.5s 2.5s forwards;
  opacity: 0;
}

@keyframes fadeInArrow {
  to {
    opacity: 0.8;
  }
}

/* Sticker animation */
.hologram-sticker {
  opacity: 0;
  animation: fadeIn 0.5s 1.9s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
`;

// Example usage component
const ExampleCard = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <HologramSticker.Root theme="dark">
        <HologramSticker.Controls />
        <HologramSticker.Minimap />
        <HologramSticker.Scene>
          <HologramSticker.Arrow />
          <HologramSticker.Card>
            {/* Back of card */}
            <HologramSticker.Back emboss={true}>
              <HologramSticker.Background>
                <img
                  src="https://assets.codepen.io/605876/techtrades-backdrop.png"
                  alt="Background"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </HologramSticker.Background>
              <HologramSticker.Wordmark
                src="https://assets.codepen.io/605876/techtrades-wordmark.png"
                alt="Tech Trades"
                position="top"
              />
              <HologramSticker.Wordmark
                src="https://assets.codepen.io/605876/techtrades-wordmark.png"
                alt="Tech Trades"
                position="bottom"
              />
              <HologramSticker.Gemstone
                src="https://assets.codepen.io/605876/techtrades-gemstone.png"
                alt=""
              />
              <HologramSticker.Spotlight />
            </HologramSticker.Back>

            {/* Front of card - Complete 8 layer structure */}
            <HologramSticker.Front>
              {/* Layer 1: Base image */}
              <HologramSticker.ImageLayer
                src="https://assets.codepen.io/605876/headshot--square.jpeg"
                alt="Person"
              />


              {/* Layer 4: Pattern holographic effect */}
              <HologramSticker.Pattern opacity={0.4}>
                <HologramSticker.Refraction intensity={1} />
              </HologramSticker.Pattern>

              {/* Layer 5: Watermark effect */}
              <HologramSticker.Watermark
                imageUrl="https://assets.codepen.io/605876/shopify-pattern.svg"
                opacity={1}
              >
                <HologramSticker.Refraction intensity={0.8} />
              </HologramSticker.Watermark>

              {/* Layer 6: Frame with content */}
              <HologramSticker.Frame emboss={true}>
                <img
                  src="https://assets.codepen.io/605876/headshot--square-transparent.png"
                  alt=""
                />
              </HologramSticker.Frame>

              {/* Layer 7: Spotlight effect */}
              <HologramSticker.Spotlight intensity={1} />

              {/* Layer 8: Glare container */}
              {/* <HologramSticker.Glare animate={true} /> */}
            </HologramSticker.Front>
          </HologramSticker.Card>
        </HologramSticker.Scene>
        <HologramSticker.Filters />
      </HologramSticker.Root>
    </div>
  );
};

export default ExampleCard;
export { HologramSticker };
