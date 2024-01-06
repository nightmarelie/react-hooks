import { useEffect } from 'react';

export const useTimeout = (handler: () => void, timeoutInSeconds = 5) => {
  useEffect(() => {
    const timeout = setTimeout(handler, timeoutInSeconds * 1000);

    return () => {
      clearTimeout(timeout);
    };
  });
};
