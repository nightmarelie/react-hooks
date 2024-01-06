import React from 'react';
import { useHover } from '../hooks';

export const MyHover = () => {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  return <div ref={hoverRef}>{isHovered ? '😁' : '☹️'}</div>;
};
