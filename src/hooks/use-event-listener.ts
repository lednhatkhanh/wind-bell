import React from 'react';

export const useEventListener = <K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
) => {
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener(type, listener, options);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener(type, listener, options);
      }
    };
  }, [listener, type, options]);
};
