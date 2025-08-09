import React from 'react';
import { RefractionProps } from '../types';

const Refraction: React.FC<RefractionProps> = ({ 
  className = '', 
  colors = ['hsl(5 100% 80%)', 'hsl(150 100% 60%)', 'hsl(220 90% 70%)'],
  count = 2 
}) => {
  const refractionElements = [];

  for (let i = 0; i < count; i++) {
    refractionElements.push(
      <div 
        key={i}
        className={`refraction ${className}`}
      />
    );
  }

  return <>{refractionElements}</>;
};

export default Refraction;