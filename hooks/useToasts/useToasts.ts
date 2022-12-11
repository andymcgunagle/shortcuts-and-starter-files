import { useEffect } from "react";

import { RootState } from "../../redux/store";
import { setToasts, Toast } from "../../redux/toastsSlice";
import { useDispatch, useSelector } from "react-redux";

export function useToasts() {
  const toasts = useSelector((state: RootState) => state.toasts.toasts);

  const dispatch = useDispatch();

  // Add a toast to the list of toasts.
  function addToast(toast: Toast) {
    const newToastWithId = {
      ...toast,
      id: Math.floor(Math.random() * (100000 - 1) + 1),
    };

    // Ensures there will never be more than 2 toasts at a time.
    if (toasts.length >= 2) {
      dispatch(setToasts([
        newToastWithId,
        ...toasts.slice(0, toasts.length - 1),
      ]));
      return;
    };

    dispatch(setToasts([
      newToastWithId,
      ...toasts,
    ]));
  };

  // Remove a toast from the list of toasts when the toast is clicked.
  function removeToastOnClick(toastId: Toast['id']) {
    dispatch(setToasts(toasts.filter((toast: Toast) => toast.id !== toastId)));
  };

  // Remove last toast from toast array every 5 seconds until there are no more toasts.
  useEffect(() => {
    if (toasts.length === 0) return;

    const timer = setTimeout(() => {
      dispatch(setToasts(toasts.slice(0, -1)));
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch, toasts]);

  return {
    addToast,
    removeToastOnClick,
    toasts,
  };
};