import React from 'react';

interface Props {
  searchHandler: (searchQuery: string) => void;
  resetHandler: () => void;
  searchQuery: string;
}

interface State {
  searchQuery: string;
}

export class Search extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchQuery: props.searchQuery,
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ searchQuery: this.props.searchQuery });
    }
  }

  resetHandler = () => {
    this.setState({ searchQuery: '' }, () => {
      localStorage.removeItem('nasa-search-queue');
      this.props.resetHandler();
    });
  };

  searchHandler = () => {
    localStorage.setItem('nasa-search-queue', this.state.searchQuery);
    this.props.searchHandler(this.state.searchQuery);
  };

  render() {
    return (
      <div className="mt-4 space-y-4 rounded-lg bg-white px-2 py-3 text-center text-black shadow-md sm:px-4 sm:text-left">
        <h1 className="select-none font-pixelify text-3xl font-bold">
          🚀 NASA Images Viewer
        </h1>
        <div className="flex justify-stretch">
          <input
            id="search"
            className="min-w-0 flex-grow rounded-s-md bg-slate-300 p-1 pl-2 font-pixelify backdrop-blur-lg"
            value={this.state.searchQuery}
            placeholder="type search keywords"
            type="text"
            onChange={(e) => {
              this.setState({ searchQuery: e.target.value.trim() });
            }}
            onKeyDown={(e) => {
              if (e.key !== 'Enter') return;
              this.searchHandler();
            }}
          />
          <button
            className="button-red !rounded-none"
            onClick={this.resetHandler}
          >
            Reset
          </button>
          <button
            className="button-blue !rounded-s-none"
            onClick={this.searchHandler}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}
