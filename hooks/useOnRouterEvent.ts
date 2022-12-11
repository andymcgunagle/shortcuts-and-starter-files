import { useEffect } from "react";

import { useRouter } from "next/router";

interface UseOnRouteChangeCompleteArgs {
  action: () => void;
  event: 'routeChangeStart' | 'beforeHistoryChange' | 'routeChangeComplete' | 'routeChangeError' | 'hashChangeStart' | 'hashChangeComplete';
};

export function useOnRouterEvent({
  action,
  event,
}: UseOnRouteChangeCompleteArgs) {
  const router = useRouter();

  useEffect(() => {
    router.events.on(event, () => action());
    return () => router.events.off(event, action);
  }, [action, event, router.events]);
};
