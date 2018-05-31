import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('<App />', () => {
  test('App Exists', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toBeDefined();
  });
});
