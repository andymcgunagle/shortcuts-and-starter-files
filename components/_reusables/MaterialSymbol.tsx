import styled from 'styled-components';

const Span = styled.span`
  &.material-symbols-rounded {
    font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 48
  }

  &.material-symbols-rounded.filled {
    font-variation-settings:
    'FILL' 1,
    'wght' 400,
    'GRAD' 0,
    'opsz' 48
  }
`;

export default function MaterialSymbol({
  className,
  icon,
  ...rest
}: MaterialSymbolProps) {
  return (
    <Span
      {...rest}
      className={`material-symbols-rounded ${className}`}
    >
      {icon}
    </Span>
  );
};

interface MaterialSymbolProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string | 'filled',
  icon: string,
};
