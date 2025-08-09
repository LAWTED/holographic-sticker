import React from 'react';

export interface BackProps {
  children: React.ReactNode;
  className?: string;
  emboss?: boolean;
}

const Back: React.FC<BackProps> = ({ 
  children, 
  className = '', 
  emboss = true, 
  ...props 
}) => {
  return (
    <div
      className={`sticker-back ${emboss ? 'sticker-emboss' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Back;