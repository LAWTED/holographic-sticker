import React, { useEffect, useState, useRef } from 'react';
import { HologramProvider } from '../context';
import { RootProps, PointerPosition } from '../types';

const Root: React.FC<RootProps> = ({ children, className = '', style }) => {
  const [pointerPosition, setPointerPosition] = useState<PointerPosition>({ x: 0, y: 0 });
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      // 找到卡片元素 - 原版逻辑是基于卡片的边界框
      const stickerCard = document.querySelector('.sticker-card') as HTMLElement;
      if (!stickerCard) return;
      
      const bounds = stickerCard.getBoundingClientRect();
      const posX = e.clientX - bounds.x;
      const posY = e.clientY - bounds.y;
      const ratioX = posX / bounds.width - 0.5;
      const ratioY = posY / bounds.height - 0.5;
      const pointerX = Math.max(-1, Math.min(1, ratioX * 2));
      const pointerY = Math.max(-1, Math.min(1, ratioY * 2));

      setPointerPosition({ x: pointerX, y: pointerY });
    };

    document.addEventListener('pointermove', handlePointerMove);
    
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <HologramProvider value={{ pointerPosition }}>
      <div ref={rootRef} className={className} style={style}>
        {children}
      </div>
    </HologramProvider>
  );
};

export default Root;