import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CardProps } from '../types';

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  width, 
  aspectRatio 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [pointerX, setPointerX] = useState(0);
  const [pointerY, setPointerY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const bounds = cardRef.current.getBoundingClientRect();
    const posX = e.clientX - bounds.x;
    const posY = e.clientY - bounds.y;
    const ratioX = posX / bounds.width - 0.5;
    const ratioY = posY / bounds.height - 0.5;
    const normalizedX = Math.max(-1, Math.min(1, ratioX * 2));
    const normalizedY = Math.max(-1, Math.min(1, ratioY * 2));

    // 设置旋转角度
    setRotateX(normalizedY * 25); // X轴旋转角度
    setRotateY(normalizedX * -25); // Y轴旋转角度
    
    // 设置指针位置用于refraction效果
    setPointerX(normalizedX);
    setPointerY(normalizedY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setPointerX(0);
    setPointerY(0);
  };

  const cardStyle = {
    '--sticker-pointer-x': pointerX,
    '--sticker-pointer-y': pointerY,
    ...(width && { width: `${width}px` }),
    ...(aspectRatio && { aspectRatio: aspectRatio }),
  } as React.CSSProperties;

  return (
    <motion.div 
      ref={cardRef} 
      className={`sticker-card ${className}`}
      style={cardStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: "tween",
        ease: "easeOut",
        duration: 0.15,
      }}
    >
      <div className="sticker-content">
        {children}
      </div>
    </motion.div>
  );
};

export default Card;