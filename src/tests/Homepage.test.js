import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import Homepage from '../components/Homepage';


describe('Component: ', () => {

  //const minProps = {};

  it('works', () => {
    expect(true).toEqual(true);
    const wrapper = shallow(<Homepage/>);
    expect(wrapper.find('.homepage').length).toEqual(1);
    expect(true).toEqual(false);
  });

});