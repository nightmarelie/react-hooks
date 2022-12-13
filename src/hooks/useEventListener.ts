import { useEffect, useRef, SyntheticEvent } from "react";

type EventListenerProps<E extends SyntheticEvent> = {
  eventName: string;
  handler: (event: E) => void;
  element?: HTMLElement | (Window & typeof globalThis);
};

export const useEventListener = <E extends SyntheticEvent>({
  eventName,
  handler,
  element = window,
}: EventListenerProps<E>) => {
  // Create a ref that stores handler
  const savedHandler = useRef<EventListenerProps<E>["handler"]>();
  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = element && element.addEventListener;
      if (!isSupported || !savedHandler.current) return;
      // Create event listener that calls handler function stored in ref
      const eventListener = (event: Event) =>
        savedHandler.current && savedHandler.current(event as unknown as E);
      // Add event listener
      element.addEventListener(eventName, eventListener);
      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
};
