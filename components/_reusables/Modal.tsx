import { useClickOutside } from 'lib/hooks/useClickOutside';
import { useKeydownListener } from 'lib/hooks/useForms/useKeydownListener';

import styled from 'styled-components';

const FullPageBackgroundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.125rem;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  animation: var(--animation-fade-in);
  background-color: hsla(0, 0%, 0%, 0.25);
  height: 100vh;
  z-index: 9999;

  @media only screen and (min-width: 640px) {    
    & > div {
      animation: var(--animation-fade-in);
    }
  }
`;

const ModalStyles = styled.div`
  position: relative;

  animation: var(--animation-slide-in-up);
  box-shadow: var(--box-shadow-10);
  max-height: calc(100% - 1rem);
  max-width: var(--breakpoint-4);
  width: calc(100% - 1rem);
  
  & #children-wrapper {
    background-color: var(--white);
    border-radius: 0 0 var(--border-radius-4) var(--border-radius-4);
    border: var(--border) var(--border) none var(--border);
    max-height: calc(100% - 2.25rem);
    overflow-y: scroll;
    padding: 1rem;
  }

  @media only screen and (min-width: 768px) {
    & #children-wrapper {
      padding: 1rem 2.5rem 2.5rem 2.5rem;
    }
  }
`;

interface ModalProps {
  children: React.ReactNode;
  closeModalHandler: () => void;
};

export default function Modal({
  children,
  closeModalHandler,
}: ModalProps) {

  const ref = useClickOutside<HTMLDivElement>(closeModalHandler);

  useKeydownListener({
    action: closeModalHandler,
    key: 'Escape',
  });

  return (
    <FullPageBackgroundWrapper>
      <ModalStyles
        ref={ref}
      >
        {children}
      </ModalStyles>
    </FullPageBackgroundWrapper>
  );
};
