import React from 'react';

interface State {
  hasError: boolean;
  error: Error | null;
}

interface Props {
  children: React.ReactNode;
  hardResetHandler: () => void;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch() {
    return;
  }

  resetAndUpdate = () => {
    this.props.hardResetHandler();
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto my-auto flex flex-col items-center font-pixelify text-lg text-red-500">
          <h1>Oops! Something went wrong.</h1>
          <button className="button-blue my-4" onClick={this.resetAndUpdate}>
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
