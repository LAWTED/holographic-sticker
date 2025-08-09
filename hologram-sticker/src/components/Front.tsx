import React from 'react';

export interface FrontProps {
  children: React.ReactNode;
  className?: string;
}

const Front: React.FC<FrontProps> = ({ children, className = '', ...props }) => {
  return (
    <div className={`sticker-front ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Front;