import React from 'react';
import { extractErrorMessage } from '@/utils/extractErrorMessage';

interface State {
  hasError: boolean;
  error: Error | null;
}

interface Props {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch() {}

  render() {
    if (this.state.hasError) {
      return (
        <div
          data-testid="error-boundary"
          className="font-pixelify mx-auto my-auto flex flex-col items-center text-lg text-red-500"
        >
          <h1>Oops! Something went wrong.</h1>
          <i>{extractErrorMessage(this.state.error)}</i>
          <button className="button-blue my-4" onClick={() => this.setState({ hasError: false })}>
            Try again?
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
