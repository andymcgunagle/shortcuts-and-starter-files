import { useRef, useEffect } from "react";

export function useClickOutside<T extends HTMLElement>(clickOutsideAction: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        clickOutsideAction();
      };
    };

    document.addEventListener('click', handleClick, true);

    return () => document.removeEventListener('click', handleClick, true);
  }, [clickOutsideAction, ref]);

  return ref;
};