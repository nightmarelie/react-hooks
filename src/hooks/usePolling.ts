import { useRef, useEffect } from 'react';

export const usePolling = (onFetch: () => Promise<void>, delay = 2000, isDone = false) => {
  const savedCallback = useRef<() => Promise<void>>();
  const intervalID = useRef<ReturnType<typeof setInterval>>();

  const clearIntervalHandler = () => {
    intervalID.current && clearInterval(intervalID.current);
  };

  const tickHandler = async () => {
    savedCallback.current && (await savedCallback.current());
  };

  useEffect(() => {
    savedCallback.current = onFetch;
  }, [onFetch]);

  useEffect(() => {
    isDone && clearIntervalHandler();
  }, [isDone]);

  useEffect(() => {
    if (!isDone) {
      intervalID.current = setInterval(async () => await tickHandler(), delay);
    }

    return () => clearIntervalHandler();
  }, [isDone, delay]);
};
