import { useToasts } from "lib/hooks/useToasts/useToasts";

import styled from "styled-components";

import MaterialSymbol from "./MaterialSymbol";

const Wrapper = styled.div`
  --border-left-color: var(--gray-500); 

  display: flex;
  gap: 1rem;
  align-items: center;
  
  animation: var(--animation-fade-in);
  background-color: white;
  border-left: 10px solid var(--border-left-color);
  border-radius: var(--border-radius-2);
  box-shadow: var(--box-shadow-4);
  /* cursor: url('close_cursor.png'), auto; */
  max-width: var(--breakpoint-0);
  padding: 1rem;
  user-select: none;
  width: calc(100vw - 2rem);
  z-index: 9999;

  &.danger {
    --border-left-color: var(--danger-500);
  }

  &.success {
    --border-left-color: var(--success-500);
  }

  &.warning {
    --border-left-color: var(--warning-500);
  }
`;

interface ToastProps {
  id?: number;
  message: string;
  type?: 'danger' | 'success' | 'warning';
};

export default function Toast({
  id,
  message,
  type,
}: ToastProps) {

  const { removeToastOnClick } = useToasts();

  function getIcon(type: string | undefined) {
    switch (type) {
      case 'danger':
        return 'error';
      case 'success':
        return 'check_circle';
      case 'warning':
        return 'warning';
      default:
        return 'info';
    };
  };

  return (
    <Wrapper
      className={type}
      onClick={() => removeToastOnClick(id)}
    >
      <MaterialSymbol icon={getIcon(type)} />
      <span>{message}</span>
    </Wrapper>
  );
};
