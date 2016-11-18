import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import {getMockLibraryManager} from '../testUtils';
import {Homepage} from '../../components/Homepage/Homepage';


//https://github.com/airbnb/enzyme/blob/master/docs/api/selector.md

describe('Component: Homepage', () => {
  //const minProps = {};

  it('has InputTextBox for user to create library when libry is not available', () => {
    var props = getMockLibraryManager();
    props.libraryIsAvailable = false;
    const homepage = shallow(<Homepage libraryManager={props}/>);

    expect(homepage.find('InputTextBox').length).toEqual(1);
  });

  it('calls getAttr on libraryManager if library is available and renders ChartRenderer', ()=>{
    var props = getMockLibraryManager();
    const homepage = shallow(<Homepage libraryManager={props}/>);

    expect(homepage.instance().props.libraryManager.calledMethods.length).toEqual(1);
    expect(homepage.instance().props.libraryManager.calledMethods.includes('getAttr')).toEqual(true);
    expect(homepage.find('ChartRenderer').length).toEqual(1);
  })

});
