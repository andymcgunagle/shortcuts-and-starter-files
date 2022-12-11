import { useEffect } from "react";

interface UseKeyListenerArgs {
  action: () => void;
  key: KeyboardEvent['key'] | KeyboardEvent['key'][];
};

export function useKeydownListener({
  action,
  key,
}: UseKeyListenerArgs) {
  useEffect(() => {
    function listener(event: KeyboardEvent) {
      if (Array.isArray(key)) {
        if (key.includes(event.key)) action();
      } else {
        if (event.key === key) action();
      };
    };

    document.addEventListener('keydown', listener);

    return () => document.removeEventListener('keydown', listener);
  }, [action, key]);
};