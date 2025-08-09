import React from 'react';

const Filters: React.FC = () => (
  <svg className="sr-only" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="sticker-lighting">
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
      <filter id="sticker-filter">
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

export default Filters;