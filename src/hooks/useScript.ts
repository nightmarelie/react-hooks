import { SyntheticEvent, useEffect, useState } from 'react';

type ScriptProps = {
  src: string;
};

enum Status {
  LOADING = 'loading',
  IDLE = 'idle',
  READY = 'ready',
  ERROR = 'error',
}

export const useScript = ({ src }: ScriptProps) => {
  // Keep track of script status ("idle", "loading", "ready", "error")
  const [status, setStatus] = useState<Status>(src ? Status.LOADING : Status.IDLE);
  useEffect(
    () => {
      // Allow falsy src value if waiting on other data needed for
      // constructing the script URL passed to this hook.
      if (!src) {
        setStatus(Status.IDLE);
        return;
      }
      // Fetch existing script element by src
      // It may have been added by another intance of this hook
      let script: HTMLScriptElement = document.querySelector(`script[src="${src}"]`)!;

      if (!script) {
        // Create script
        script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.setAttribute('data-status', 'loading');
        // Add script to document body
        document.body.appendChild(script);
        // Store status in attribute on script
        // This can be read by other instances of this hook
        const setAttributeFromEvent = (event: any) => {
          script.setAttribute('data-status', event.type === 'load' ? Status.READY : Status.ERROR);
        };
        script.addEventListener('load', setAttributeFromEvent);
        script.addEventListener('error', setAttributeFromEvent);
      } else {
        // Grab existing script status from attribute and set to state.
        setStatus((script as HTMLScriptElement).getAttribute('data-status') as Status);
      }
      // Script event handler to update status in state
      // Note: Even if the script already exists we still need to add
      // event handlers to update the state for *this* hook instance.
      const setStateFromEvent = (event: any) => {
        setStatus(event.type === 'load' ? Status.READY : Status.ERROR);
      };
      // Add event listeners
      script.addEventListener('load', setStateFromEvent);
      script.addEventListener('error', setStateFromEvent);
      // Remove event listeners on cleanup
      return () => {
        if (script) {
          script.removeEventListener('load', setStateFromEvent);
          script.removeEventListener('error', setStateFromEvent);
        }
      };
    },
    [src], // Only re-run effect if script src changes
  );
  return status;
};
