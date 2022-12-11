import { useRef } from "react";

export function useSubmitTextAreaOnEnter() {
  const formRef = useRef<HTMLFormElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  function onEnterPress(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (
      formRef.current &&
      submitButtonRef.current &&
      event.key == 'Enter' &&
      event.shiftKey == false
    ) {
      event.preventDefault();
      submitButtonRef.current.click();
    };
  };

  return {
    formRef,
    onEnterPress,
    submitButtonRef,
  };
};