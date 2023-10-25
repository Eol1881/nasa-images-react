import './App.css';
import React from 'react';
import { fetchData } from './api/api';
import { ImageData } from './api/types';
import { Search } from './components/Search';
import { Results } from './components/Results';
import { Loader } from './components/Loader';

interface Props {}
interface State {
  imagesData: ImageData[];
  pageIndex: number;
  searchQuery: string;
  shouldThrowError: boolean;
  isLoading: boolean;
}

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      imagesData: [],
      pageIndex: 1,
      searchQuery: localStorage.getItem('nasa-search-queue') || '',
      shouldThrowError: false,
      isLoading: false,
    };
  }

  async componentDidUpdate(_prevProps: never, prevState: State) {
    const { pageIndex, searchQuery } = this.state;
    if (
      prevState.pageIndex !== pageIndex ||
      prevState.searchQuery !== searchQuery
    ) {
      await this.updateResults();
    }
  }

  async componentDidMount() {
    await this.updateResults();
  }

  private updateResults = async () => {
    try {
      this.setState({ isLoading: true });
      const fetchedImagesData = await fetchData(
        this.state.pageIndex,
        this.state.searchQuery
      );
      this.setState({ imagesData: fetchedImagesData || [] }, () =>
        console.log(this.state.imagesData)
      );
    } catch (error) {
      this.setState({ imagesData: [] });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  private searchHandler = (searchQuery: string) => {
    this.setState({ searchQuery: searchQuery, pageIndex: 1 });
  };

  private resetHandler = () => {
    this.setState({ searchQuery: '', pageIndex: 1 });
  };

  private throwErrorHandler = () => {
    this.setState({ shouldThrowError: true });
  };

  render() {
    if (this.state.shouldThrowError) throw new Error('Fake rendering error');
    return (
      <>
        <Search
          searchQuery={this.state.searchQuery}
          searchHandler={this.searchHandler}
          resetHandler={this.resetHandler}
        ></Search>
        {this.state.isLoading ? (
          <Loader></Loader>
        ) : (
          <Results imagesData={this.state.imagesData}></Results>
        )}
        <button className="button-red mt-4" onClick={this.throwErrorHandler}>
          Throw fake error
        </button>
      </>
    );
  }
}
