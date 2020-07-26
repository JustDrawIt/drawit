import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  test('App Exists', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeDefined();
  });
});
