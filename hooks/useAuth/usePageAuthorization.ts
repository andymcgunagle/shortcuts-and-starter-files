import { useEffect } from "react";

import { useRouter } from "next/router";

import { useUserSlice } from "../useSlices/useUserSlice";

export function usePageAuthorization() {
  const { isLoading, uid } = useUserSlice();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !uid) router.push('/');
  }, [isLoading, router, uid]);
};