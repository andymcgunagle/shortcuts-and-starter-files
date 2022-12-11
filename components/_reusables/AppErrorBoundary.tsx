import React, { Component, ReactNode } from "react";

import { NextRouter, withRouter } from "next/router";

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  
  min-height: 100vh;
`;

interface WithRouterProps {
  router: NextRouter;
}

interface Props extends WithRouterProps {
  children?: ReactNode;
};

interface State {
  hasError: boolean;
};

class AppErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  };

  // public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  //   // You can use your own error logging service here
  // };

  public render() {
    if (this.state.hasError) {
      return (
        <Wrapper>
          <h1>
            Something went wrong...
          </h1>
          <button
            onClick={async () => {
              await this.props.router.push('/');
              this.setState({ hasError: false });
            }}
          >
            Back to home page
          </button>
        </Wrapper>
      );
    };

    return this.props.children;
  };
};

export default withRouter(AppErrorBoundary);