import { useClickOutside } from "lib/hooks/useClickOutside";
import { useKeydownListener } from "lib/hooks/useForms/useKeydownListener";

import styled from 'styled-components';

import MaterialSymbol from "./MaterialSymbol";

const DialogStyles = styled.dialog`
  --message-wrapper-background-color: var(--white);
  --message-wrapper-color: var(--gray-900);
  --dialog-border-radius: var(--border-radius-2);

  display: flex;
  flex-direction: column;

  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);

  animation: var(--animation-fade-in);
  background-color: var(--white);
  border-radius: var(--dialog-border-radius);
  border: var(--border);
  box-shadow: var(--box-shadow-10);
  max-width: 500px;
  width: calc(100% - 2rem);
  z-index: var(--z-index-10);

  @media only screen and (min-width: 768px) {
    top: 33%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  & * {
    word-break: break-word;
  }

  & > * {
    padding: 1rem;
  }

  & #message-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    background-color: var(--message-wrapper-background-color);
    border-radius: var(--dialog-border-radius) var(--dialog-border-radius) 0 0;
  }

  & #message-wrapper * {
    color: var(--message-wrapper-color);
  }

  /* Types */

  &.danger {
    --message-wrapper-background-color: var(--danger-500);
    --message-wrapper-color: var(--white);
  }

  &.success {
    --message-wrapper-background-color: var(--success-500);
    --message-wrapper-color: var(--white);
  }

  &.warning {
    --message-wrapper-background-color: var(--warning-500);
    --message-wrapper-color: var(--white);
  }
`;

export default function Dialog({
  children,
  dialogMessage,
  feedbackType,
  closeDialogHandler,
}: DialogProps) {
  let icon;

  switch (feedbackType) {
    case 'danger':
      icon = 'error';
      break;
    case 'success':
      icon = 'check_circle';
      break;
    case 'warning':
      icon = 'warning';
      break;
    default:
      icon = '';
  };

  const ref = useClickOutside<HTMLDialogElement>(closeDialogHandler);

  useKeydownListener({
    action: closeDialogHandler,
    key: 'Escape',
  });

  return (
    <DialogStyles
      className={`${feedbackType}`}
      ref={ref}
    >
      <div id="message-wrapper">
        <MaterialSymbol icon={icon} />
        <p>{dialogMessage}</p>
      </div>
      <div id="children-wrapper">
        {children}
      </div>
    </DialogStyles>
  );
};

interface DialogProps {
  children: React.ReactNode,
  closeDialogHandler: () => void,
  dialogMessage: string,
  feedbackType?: 'danger' | 'success' | 'warning',
};
