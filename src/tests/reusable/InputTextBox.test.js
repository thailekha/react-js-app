import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import InputTextBox from '../../components/reusable/InputTextBox';

import '../.setupjsdom';

const getMockProps = function(spy) {
  return {
    header: "test header",
    placeholder: "test holder",
    submitHandler: function() {
      spy.push(true);
    }
  }
}

describe('Component: InputTextBox', () => {
  //header, placeholder, submitHandler

  //spy should be an array so that the reference to spy is passed to the component instead of value like other basic data types
  it('has a form with input field which is kept track by a state', ()=> {
    var spy = [];
    var props = getMockProps(spy);
    const inputtextbox = shallow(<InputTextBox header={props.header} placeholder={props.placeholder}
                                               submitHandler={props.submitHandler}/>);

    expect(inputtextbox.find('form').length).toEqual(1);
    expect(inputtextbox.find('input').length).toEqual(1);
    expect(inputtextbox.instance().state).toEqual({text: ''});

  });

  it('changes state when user types', ()=> {
    var spy = [];
    var props = getMockProps(spy);
    const inputtextbox = shallow(<InputTextBox header={props.header} placeholder={props.placeholder}
                                               submitHandler={props.submitHandler}/>);
    inputtextbox.find('input').simulate('change', {
      target: {value: 'something typed'}
    });
    expect(inputtextbox.instance().state).toEqual({text: 'something typed'});
  });

  it('calls submitHandler only when user has typed in something', ()=> {
    var spy = [];
    var props = getMockProps(spy);
    const inputtextbox = shallow(<InputTextBox header={props.header} placeholder={props.placeholder}
                                               submitHandler={props.submitHandler}/>);

    //click submit button
    inputtextbox.find('Button').simulate('click', {
      preventDefault(){
      } //NEEDED BECAUSE A SIMULATED EVENT DOES NOT HAVE THIS METHOD
    });
    expect(spy.length).toEqual(0);
    //type in something and click submit button
    inputtextbox.find('input').simulate('change', {
      target: {value: 'something typed'},
    });
    inputtextbox.find('Button').simulate('click', {
      preventDefault(){
      } //NEEDED BECAUSE A SIMULATED EVENT DOES NOT HAVE THIS METHOD
    });
    expect(spy.length).toEqual(1);
    expect(spy[0]).toEqual(true);
  });
});

