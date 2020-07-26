import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import store from '../store';

describe('<App />', () => {
  test('matches snapshot', () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    expect(container).toMatchSnapshot();
  });

  describe('<ScreenPlay', () => {
    // TODO: Need to implement server mock. "Mock Service Worker" could work.
    test.skip('displays join game form', async () => {
      const history = createMemoryHistory();
      render(
        <Router history={history}>
          <App />
        </Router>
      );

      fireEvent.change(screen.getByPlaceholderText('Join code'), { target: { value: '_xf3ZtJ' } });
      fireEvent.click(screen.getByText('Play!'));

      await waitFor(() => screen.getByRole('heading'));
      screen.debug();

      expect(screen.getByRole('heading')).toHaveTextContent('Enter A Nickname');
    });

    test('displays create game button', () => {
      const history = createMemoryHistory();
      render(
        <Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </Provider>
      );

      fireEvent.click(screen.getByText('Create a game'));

      expect(screen.getByRole('heading')).toHaveTextContent('Create Game');
    });
  });
});
