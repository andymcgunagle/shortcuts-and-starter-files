import { firebaseAuth } from "lib/firebase/firebase";
import { signInWithPopup, AuthProvider } from "firebase/auth";

import { useErrorHandlerWithToasts } from "../useToasts/useErrorHandlerWithToasts";
import { useToasts } from "../useToasts/useToasts";

export function useAuthProvider() {
  const { addToast } = useToasts();
  const { errorHandlerWithToasts } = useErrorHandlerWithToasts();

  async function authorizeWithProvider(authProvider: AuthProvider) {
    try {
      const result = await signInWithPopup(firebaseAuth, authProvider);

      const displayName = result.user?.displayName;

      addToast({
        message: displayName ? `Welcome, ${displayName}!` : 'Welcome!',
        type: 'success',
      });
    } catch (error) {
      errorHandlerWithToasts(error);
    };
  };

  return {
    authorizeWithProvider,
  };
};
