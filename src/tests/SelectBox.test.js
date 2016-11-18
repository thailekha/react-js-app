import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import SelectBox from '../components/reusable/SelectBox';

/*
 props: {
 changeHandler:
 changeHandlerIsFrom:
 options: [
 {
 value:
 display:
 }, ...
 ]
 }
 **/

const getMockProps = function(spy) {
  return {
    changeHandler: function() {
      spy.push(true);
    },
    changeHandlerIsFrom: "tester",
    options: [
      {
        value: "A",
        display: "A"
      }, {
        value: "B",
        display: "B"
      }
    ]
  }
};

describe('Component: CreateBox', () => {
  //header, placeholder, submitHandler

  it('has a select tag with option tags nested within', ()=> {
    var props = getMockProps();
    const selectbox = shallow(<SelectBox header={props.header} placeholder={props.placeholder}
                                            submitHandler={props.submitHandler}/>);

    expect(selectbox.find('form').length).toEqual(1);
    expect(selectbox.find('input').length).toEqual(1);
    expect(selectbox.instance().state).toEqual({text: ''});

  });

  it('changes state when user types', ()=> {
    var props = getMockProps();
    const selectbox = shallow(<SelectBox header={props.header} placeholder={props.placeholder}
                                            submitHandler={props.submitHandler}/>);
    selectbox.find('input').simulate('change', {
      target: {value: 'something typed'}
    });
    expect(selectbox.instance().state).toEqual({text: 'something typed'});
  });

  it('calls submitHandler only when user has typed in something', ()=> {
    var props = getMockLibraryManager();
    const selectbox = shallow(<SelectBox libraryManager={props}/>);
    //click submit button
    selectbox.find('Button').simulate('click', {
      preventDefault(){
      } //NEEDED BECAUSE A SIMULATED EVENT DOES NOT HAVE THIS METHOD
    });
    expect(selectbox.instance().props.submitHandlerCalled).toEqual(false);
    //type in something and click submit button
    selectbox.find('input').simulate('change', {
      target: {value: 'something typed'},
    });
    selectbox.find('Button').simulate('click', {
      preventDefault(){
      } //NEEDED BECAUSE A SIMULATED EVENT DOES NOT HAVE THIS METHOD
    });
    expect(selectbox.instance().props.submitHandlerCalled).toEqual(false);
  });
});

