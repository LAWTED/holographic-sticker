import React, { useState } from 'react';
import { useHologram } from './HologramContext';

export interface ControlsProps {
  className?: string;
  showTheme?: boolean;
  showAnimate?: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  className = '',
  showTheme = true,
  showAnimate = true,
  ...props
}) => {
  const { isExploded, setIsExploded, theme, rootRef } = useHologram();
  const [animate, setAnimate] = useState(true);
  const [currentTheme, setCurrentTheme] = useState(theme);

  const toggleTheme = () => {
    const themes = ['system', 'light', 'dark'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const newTheme = themes[nextIndex];
    setCurrentTheme(newTheme);
    
    // Update the scoped root element
    if (rootRef.current) {
      rootRef.current.dataset.theme = newTheme;
    }
  };

  return (
    <div className={`sticker-controls ${className}`} {...props}>
      <button
        onClick={() => setIsExploded(!isExploded)}
        className="sticker-control-btn"
        type="button"
      >
        {isExploded ? '📦 Collapse' : '💥 Explode'}
      </button>
      {showAnimate && (
        <button
          onClick={() => setAnimate(!animate)}
          className="sticker-control-btn"
          type="button"
        >
          {animate ? '⏸️ Pause' : '▶️ Animate'}
        </button>
      )}
      {showTheme && (
        <button 
          onClick={toggleTheme} 
          className="sticker-control-btn"
          type="button"
        >
          🎨 {currentTheme}
        </button>
      )}
    </div>
  );
};

export default Controls;