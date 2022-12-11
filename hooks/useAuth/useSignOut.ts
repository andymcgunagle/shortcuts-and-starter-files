import { useRouter } from "next/router";

import { signOut } from "firebase/auth";
import { firebaseAuth } from "lib/firebase/firebase";

import { useErrorHandlerWithToasts } from "../useToasts/useErrorHandlerWithToasts";
import { useToasts } from "../useToasts/useToasts";

export function useSignOut() {

  const router = useRouter();
  const { addToast } = useToasts();
  const { errorHandlerWithToasts } = useErrorHandlerWithToasts();

  async function signOutUser() {
    try {
      await signOut(firebaseAuth);

      addToast({
        message: 'Successfully signed out - come back soon!',
        type: 'success',
      });
    } catch (error) {
      errorHandlerWithToasts(error);
    };
  };

  return { signOutUser };
};