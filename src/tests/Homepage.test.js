import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import {getMockLibraryManager} from './testUtils';
import {Homepage,CreateBox} from '../components/Homepage/Homepage';


//https://github.com/airbnb/enzyme/blob/master/docs/api/selector.md

describe('Component: Homepage', () => {
  //const minProps = {};

  it('has no props, has no state, and has 3 empty divs as default', () => {
    const defaultHomepage = shallow(<Homepage/>);
    //console.log(defaultHomepage.debug());
    expect(defaultHomepage.find('.homepage').length).toEqual(1);
    expect(defaultHomepage.find('.homepage').find('div').length).toEqual(4);
    expect(defaultHomepage.instance().props).toEqual({});
    expect(defaultHomepage.instance().state).toEqual({});
  });

  it('has libraryManager in props', () => {
    var props = getMockLibraryManager();
    props.libraryIsAvailable = false;
    const homapageWithLibManager = shallow(<Homepage libraryManager={props}/>);
    console.log(homapageWithLibManager.debug());
    expect(homapageWithLibManager.find('CreateBox').length).toEqual(1);
  })

  it('has libraryManager in props with libraryIsAvailable set to True, "view: "all"" in state, header, view mode, and chart', ()=> {
    var props = getMockLibraryManager();
    const homapageWithLibManagerAndLibrary = shallow(<Homepage libraryManager={props}/>);
    //console.log(homapageWithLibManagerAndLibrary.debug());
    const calledMethods1 = homapageWithLibManagerAndLibrary.instance().props.libraryManager.calledMethods;
    expect(calledMethods1.length).toEqual(1);
    expect(calledMethods1.includes('getAttr')).toEqual(true);

    //selection box and options
    expect(homapageWithLibManagerAndLibrary.find('select').length).toEqual(1);
    expect(homapageWithLibManagerAndLibrary.find('option').length).toEqual(3);

    //chart
    expect(homapageWithLibManagerAndLibrary.find('PieChart').length).toEqual(1);
    expect(homapageWithLibManagerAndLibrary.find('Legend').length).toEqual(1);
  });

  it('changes state when user uses the selectbox', ()=>{
    var props = getMockLibraryManager();
    const homapageWithLibManagerAndLibrary = shallow(<Homepage libraryManager={props}/>);
    //change view mode of the chart
    homapageWithLibManagerAndLibrary.find('select').simulate('change', {
      target: {value: 'programminglanguages'}
    });
    expect(homapageWithLibManagerAndLibrary.instance().state).toEqual({view: 'programminglanguages'});

    homapageWithLibManagerAndLibrary.find('select').simulate('change', {
      target: {value: 'paradigms'}
    });
    expect(homapageWithLibManagerAndLibrary.instance().state).toEqual({view: 'paradigms'});
  })
});
