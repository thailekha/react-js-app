import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import Browsepage from '../components/Browsepage';


describe('Component: Browsepage', () => {

  const minProps = {};

  it('works', () => {
    expect(true).toEqual(true);

    expect(
      shallow(
        <Browsepage/>
      ).length
    ).toEqual(1);
    console.log('browsepage');
  });

});