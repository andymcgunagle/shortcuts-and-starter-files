import { useErrorHandlerWithToasts } from "../useToasts/useErrorHandlerWithToasts";

export function useFormErrorHandler(
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>,
) {
  const { errorHandlerWithToasts } = useErrorHandlerWithToasts();

  async function handleSubmitWithErrorHandler(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      await handleSubmit(event);
    } catch (error) {
      errorHandlerWithToasts(error);
    };
  };

  return { handleSubmitWithErrorHandler };
};
