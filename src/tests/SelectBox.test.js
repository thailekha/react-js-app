import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import SelectBox from '../components/reusable/SelectBox';

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

describe('Component: SelectBox', () => {
  //header, placeholder, submitHandler

  it('has a select tag and option tags', ()=> {
    var spy = [];
    var props = getMockProps(spy);
    const selectbox = shallow(<SelectBox changeHandler={props.changeHandler}
                                         changeHandlerIsFrom={props.changeHandlerIsFrom} options={props.options}/>);

    expect(selectbox.find('select').length).toEqual(1);
    expect(selectbox.find('option').length).toEqual(2);

  });

  it('calls changeHandler only when user changes the option', ()=> {
    var spy = [];
    var props = getMockProps(spy);
    const selectbox = shallow(<SelectBox changeHandler={props.changeHandler}
                                         changeHandlerIsFrom={props.changeHandlerIsFrom} options={props.options}/>);

    expect(spy.length).toEqual(0);
    //click submit button
    selectbox.find('select').simulate('change', {
      target: {
        value: props.options[0].value
      },
      preventDefault(){
      } //NEEDED BECAUSE A SIMULATED EVENT DOES NOT HAVE THIS METHOD
    });

    expect(spy.length).toEqual(1);
    expect(spy[0]).toEqual(true);
  });
});

