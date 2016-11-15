import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import Hompage from '../components/Homepage';


describe('Component: ', () => {

  const minProps = {};

  it('works', () => {
    expect(true).toEqual(true);

    expect(
      shallow(
    <Hompage/>
    ).length
    ).toEqual(1);
  });

});