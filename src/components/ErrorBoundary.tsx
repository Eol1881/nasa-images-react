import React from 'react';
import { extractErrorMessage } from '../utils/extractErrorMessage';
import { Link } from 'react-router-dom';
import { APP_CONFIG } from '../constants/constants';
import { ISearchContext, SearchContext } from '../context/SearchContextProvider';

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

  static contextType = SearchContext;

  componentDidCatch() {
    return;
  }

  resetAndUpdate = () => {
    const { setShouldThrowError } = this.context as ISearchContext;
    setShouldThrowError(false);
    localStorage.removeItem(APP_CONFIG.LOCAL_STORAGE_PREFIX);
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto my-auto flex flex-col items-center font-pixelify text-lg text-red-500">
          <h1>Oops! Something went wrong.</h1>
          <i>{extractErrorMessage(this.state.error)}</i>
          <Link className="button-blue my-4" to="/" onClick={this.resetAndUpdate}>
            Reset
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}
