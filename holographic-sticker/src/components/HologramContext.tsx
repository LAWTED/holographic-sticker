import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

// Context interface
interface HologramContextType {
  isActive: boolean;
  isExploded: boolean;
  setIsExploded: (exploded: boolean) => void;
  pointerPos: { x: string; y: string };
  showGlare: boolean;
  cardRef: React.RefObject<HTMLElement | null>;
  minimapRef: React.RefObject<HTMLDivElement | null>;
  sceneRef: React.RefObject<HTMLDivElement | null>;
  rootRef: React.RefObject<HTMLDivElement | null>;
}

// Create context
const HologramContext = createContext<HologramContextType | null>(null);

// Hook to use the hologram context
export const useHologram = (): HologramContextType => {
  const context = useContext(HologramContext);
  if (!context) {
    throw new Error(
      "Hologram components must be used within HologramSticker.Root"
    );
  }
  return context;
};

// Provider props
interface HologramProviderProps {
  children: ReactNode;
}

// Context Provider component
export const HologramProvider: React.FC<HologramProviderProps> = ({ 
  children
}) => {
  const [isActive, setIsActive] = useState(true); // 立即激活，无需等待动画
  const [isExploded, setIsExploded] = useState(false);
  const [pointerPos, setPointerPos] = useState({ x: '0', y: '0' });
  const [showGlare, setShowGlare] = useState(true);
  const cardRef = useRef<HTMLElement>(null);
  const minimapRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // 移除入场动画延迟，组件立即可用

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
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

      // Update CSS variables scoped to this hologram instance
      if (rootRef.current) {
        rootRef.current.style.setProperty("--sticker-pointer-x", pointerX.toString());
        rootRef.current.style.setProperty("--sticker-pointer-y", pointerY.toString());
      }

    };

    // 只在卡片元素上监听事件，而不是全局监听
    const element = isExploded ? minimapRef.current : cardRef.current;
    if (element) {
      element.addEventListener("pointermove", handlePointerMove as EventListener);
    }

    return () => {
      if (element) {
        element.removeEventListener("pointermove", handlePointerMove as EventListener);
      }
    };
  }, [isActive, isExploded]);

  useEffect(() => {
    // Apply explode state to the scoped root element
    if (rootRef.current) {
      rootRef.current.dataset.explode = isExploded.toString();
    }
  }, [isExploded]);

  const contextValue: HologramContextType = {
    isActive,
    isExploded,
    setIsExploded,
    pointerPos,
    showGlare,
    cardRef,
    minimapRef,
    sceneRef,
    rootRef,
  };

  return (
    <HologramContext.Provider value={contextValue}>
      {children}
    </HologramContext.Provider>
  );
};