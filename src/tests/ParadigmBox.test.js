import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import ParadigmBox from '../components/Browsepage/ParadigmBox';

//ids, items, removeHandler
const getMockProps = function(spy){
  return {
    removeHandler: function(){
      spy.push(true);
    },
    items: "OOP,POO"
  };
};

describe('Component: ParadigmBox', () => {

  it('has an input field "disabled mode" to display paradigms, and a button to remove paradigms', () => {
    var spy = [];
    var props = getMockProps(spy);
    const paradigmbox = shallow(<ParadigmBox items={props.items} removeHandler={props.removeHandler} />);
    console.log(paradigmbox.debug());

    expect(paradigmbox.find('input').length).toEqual(1);
    expect(paradigmbox.find('Button').length).toEqual(1);
  });

  it('calls removeHandler when user clicks remove button', () => {
    var spy = [];
    var props = getMockProps(spy);
    const paradigmbox = shallow(<ParadigmBox items={props.items} removeHandler={props.removeHandler} />);

    expect(spy.length).toEqual(0);
    paradigmbox.find('Button').simulate('click', {preventDefault(){}});
    expect(spy.length).toEqual(1);
    expect(spy[0]).toEqual(true);
  });

});