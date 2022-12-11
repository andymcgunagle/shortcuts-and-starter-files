import { useEffect } from "react";

import { useTypedDispatch } from "lib/redux/store";
import { setIsLoading, setUser } from "lib/redux/userSlice";

import { firebaseAuth } from 'lib/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

import { getSelectUserValues } from "lib/utils/getSelectUserValues";

export function useAuthState() {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      dispatch(setUser(user ? getSelectUserValues(user) : null));
      dispatch(setIsLoading(false));
    }, (error) => {
      console.error('Error in onAuthStateChanged: ', error.message);
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);
};
