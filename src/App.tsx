import './App.css';
import React from 'react';
import { fetchData } from './api/api';
import { ImageData } from './api/types';
import { Search } from './components/Search';
import { Results } from './components/Results';

interface AppProps {}
interface AppState {
  imagesData: ImageData[];
  pageIndex: number;
  searchQuery: string;
}

export class App extends React.Component<AppProps, AppState> {
  public state: AppState = {
    imagesData: [],
    pageIndex: 1,
    searchQuery: localStorage.getItem('nasa-search-queue') || '',
  };

  async componentDidUpdate(_prevProps: never, prevState: AppState) {
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
      const fetchedImagesData = await fetchData(
        this.state.pageIndex,
        this.state.searchQuery
      );
      this.setState({ imagesData: fetchedImagesData || [] }, () =>
        console.log(this.state.imagesData)
      );
    } catch (error) {
      this.setState({ imagesData: [] });
    }
  };

  private searchHandler = (searchQuery: string) => {
    this.setState({ searchQuery: searchQuery, pageIndex: 1 });
  };

  private resetHandler = () => {
    this.setState({ searchQuery: '', pageIndex: 1 });
  };

  render() {
    return (
      <>
        <div className="container mx-auto flex min-h-screen max-w-screen-xl flex-col p-2 ">
          <Search
            searchQuery={this.state.searchQuery}
            searchHandler={this.searchHandler}
            resetHandler={this.resetHandler}
          ></Search>
          <Results imagesData={this.state.imagesData}></Results>
        </div>
      </>
    );
  }
}
