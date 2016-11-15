import React from 'react';
import expect from 'expect';
import {shallow, mount, render} from 'enzyme';
//import Foo from './Foo';
import Homepage from '../components/Homepage';

describe("A suite", function() {
  // it("contains spec with an expectation", function() {
  //   expect(shallow(<Foo />).contains(<div className="foo" />)).toBe(true);
  // });
  //
  // it("contains spec with an expectation", function() {
  //   expect(shallow(<Foo />).is('.foo')).toBe(true);
  // });
  //
  // it("contains spec with an expectation", function() {
  //   expect(mount(<Foo />).find('.foo').length).toBe(1);
  // });
  //
  // it("can run an expectation with render", function() {
  //   expect(render(<Foo />).find('.foo').length).toBe(1);
  // });

  it('works', () => {
    expect(true).toEqual(false);

    const wrapper = shallow(<Homepage/>);


    expect(wrapper.length).toEqual(1);

  });
});
