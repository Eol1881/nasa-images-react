import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '../../components/Header';
import { APP_CONFIG } from '../../constants/constants';
import { Provider } from 'react-redux';
import store from '../../store/store';

describe('Testing Header component', () => {
  it('saves the entered value to the local storage when Search button is clicked', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>,
      { wrapper: BrowserRouter }
    );

    const searchButton = screen.getByTestId('search-button');
    const searchInput = screen.getByTestId('search-input');

    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.click(searchButton);
    expect(localStorage.getItem(APP_CONFIG.LOCAL_STORAGE_PREFIX)).toBe('test');
  });
  it('retrieves the value from the local storage upon mounting', () => {
    localStorage.setItem(APP_CONFIG.LOCAL_STORAGE_PREFIX, 'test');

    render(
      <Provider store={store}>
        <Header />
      </Provider>,
      { wrapper: BrowserRouter }
    );

    const searchInput: HTMLInputElement = screen.getByTestId('search-input');

    expect(searchInput.value).toBe('test');
  });
});
