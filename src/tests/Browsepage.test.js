var React = require('react');
var expect = require('expect');
var shallow = require('enzyme').shallow;
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