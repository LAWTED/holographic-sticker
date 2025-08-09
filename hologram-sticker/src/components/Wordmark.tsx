import React from 'react';

export interface WordmarkProps {
  src: string;
  alt?: string;
  position?: 'top' | 'bottom';
  className?: string;
}

const Wordmark: React.FC<WordmarkProps> = ({
  src,
  alt = '',
  position = 'top',
  className = '',
  ...props
}) => {
  return (
    <div
      className={`sticker-wordmark sticker-wordmark--${position} ${className}`}
      {...props}
    >
      <img src={src} alt={alt} />
    </div>
  );
};

export default Wordmark;