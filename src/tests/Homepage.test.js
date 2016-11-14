var React = require('react');
var expect = require('expect');
var {shallow} = require('enzyme');
var Hompage = require('../components/Homepage');


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