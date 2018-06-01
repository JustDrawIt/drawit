import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('<App />', () => {
  test('App Exists', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toBeDefined();
  });

  test('Has redux store', () => {
    const wrapper = shallow(<App />);
    const store = wrapper.prop('store');

    expect(store).toBeDefined();
    expect(store.dispatch).toBeInstanceOf(Function);
  });
});
