import React, { useRef, useState } from 'react';
import { useOnClickOutside } from '../hooks';

export const MyModal = () => {
  // Create a ref that we add to the element for which we want to detect outside clicks
  const ref = useRef<HTMLDivElement>(null);
  // State for our modal
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside({ ref, handler: () => setModalOpen(false) });
  return (
    <div>
      {isModalOpen ? (
        <div ref={ref}>👋 Hey, I'm a modal. Click anywhere outside of me to close.</div>
      ) : (
        <button onClick={() => setModalOpen(true)}>Open Modal</button>
      )}
    </div>
  );
};
