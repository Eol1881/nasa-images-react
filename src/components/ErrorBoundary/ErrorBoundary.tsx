import React from 'react';
import { extractErrorMessage } from '@/utils/extractErrorMessage';
import { APP_CONFIG } from '@/constants/constants';

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

  componentDidCatch() {
    return;
  }

  resetAndUpdate = () => {
    localStorage.removeItem(APP_CONFIG.LOCAL_STORAGE_PREFIX);
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div data-testid="error-boundary" className=" mx-auto my-auto flex flex-col items-center text-lg text-red-500">
          <h1>Oops! Something went wrong.</h1>
          <i>{extractErrorMessage(this.state.error)}</i>
          <button className="button-blue my-4" onClick={this.resetAndUpdate}>
            Reset
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
