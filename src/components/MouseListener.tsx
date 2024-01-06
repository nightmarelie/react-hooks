import React, { useCallback, useState, MouseEvent } from 'react';

import { useEventListener } from '../hooks';

type MousePoint = {
  x: number;
  y: number;
};

export const MouseListener = () => {
  // State for storing mouse coordinates
  const [coords, setCoords] = useState<MousePoint>({ x: 0, y: 0 });
  // Event handler utilizing useCallback ...
  // ... so that reference never changes.
  const handler = useCallback(
    ({ clientX, clientY }: MouseEvent<HTMLElement>) => {
      // Update coordinates
      setCoords({ x: clientX, y: clientY });
    },
    [setCoords],
  );
  // Add event listener using our hook
  useEventListener<MouseEvent<HTMLElement>>({
    eventName: 'mousemove',
    handler,
  });
  return (
    <h1>
      The mouse position is ({coords.x}, {coords.y})
    </h1>
  );
};
