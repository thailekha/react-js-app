import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import ChartRenderer from '../../components/reusable/ChartRenderer';
import {getMockLibraryManager} from '../mockLibraryManager';


describe('Component: ChartRenderer', () => {

  it('has a state to control view mode (default is "all"), a selectbox for user to change view mode ' +
    '(options within selectbox will not be renderred since shallowrender is used), and render PieChart,Legend ', ()=> {
    const chartrenderer = shallow(<ChartRenderer libraryManager={getMockLibraryManager()}/>);
    //console.log(chartrenderer.debug());
    expect(chartrenderer.instance().state).toEqual({view: 'all'});
    expect(chartrenderer.find('SelectBox').length).toEqual(1);
    expect(chartrenderer.find('PieChart').length).toEqual(1);
    expect(chartrenderer.find('Legend').length).toEqual(1);
  });

  it('only calls getAttr on libraryManager because the' +
    ' mock libraryManager has empty array for programminglanguages and paradigms', () => {
    const chartrenderer = shallow(<ChartRenderer libraryManager={getMockLibraryManager()}/>);
    expect(chartrenderer.instance().props.libraryManager.calledMethods.length).toEqual(1);
    expect(chartrenderer.instance().props.libraryManager.calledMethods.includes('getAttr')).toEqual(true);
  });

  it('changes the state of view mode when handleChange is triggered', ()=> {
    const chartrenderer = shallow(<ChartRenderer libraryManager={getMockLibraryManager()}/>);

    chartrenderer.instance().handleChange('programminglanguages');
    expect(chartrenderer.instance().state).toEqual({view: 'programminglanguages'});
    chartrenderer.instance().handleChange('paradigms');
    expect(chartrenderer.instance().state).toEqual({view: 'paradigms'});
  });
});

