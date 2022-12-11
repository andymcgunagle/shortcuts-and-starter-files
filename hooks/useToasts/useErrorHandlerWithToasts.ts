import { useToasts } from "./useToasts";

export function useErrorHandlerWithToasts() {
  const { addToast } = useToasts();

  function errorHandlerWithToasts(error: Error | unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      addToast({
        message: error.message,
        type: 'danger',
      });
    } else {
      console.error(error);
      addToast({
        message: 'An unknown error occurred.',
        type: 'danger',
      });
    };
  };

  return { errorHandlerWithToasts };
};