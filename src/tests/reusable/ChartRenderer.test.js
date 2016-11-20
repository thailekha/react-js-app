import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import ChartRenderer from '../../components/reusable/ChartRenderer';
import {getMockLibraryManager} from '../mockLibraryManager';


describe('Component: ChartRenderer', () => {

  it('has a state to control view mode (default is "all"), a selectbox for user to change view mode ' +
    '(options within selectbox will not be renderred since shallowrender is used), 2 buttons to change ' +
    'size of the chart, and render PieChart,Legend ', ()=> {
    const chartrenderer = shallow(<ChartRenderer libraryManager={getMockLibraryManager()}/>);
    //console.log(chartrenderer.debug());
    expect(chartrenderer.instance().state).toEqual({view: 'all', size: 600});
    expect(chartrenderer.find('SelectBox').length).toEqual(1);
    expect(chartrenderer.find('Button').length).toEqual(2);
    expect(chartrenderer.find('PieChart').length).toEqual(1);
    expect(chartrenderer.find('Legend').length).toEqual(1);
  });

  it('only calls getAttr on libraryManager because the' +
    ' mock libraryManager has empty array for programminglanguages and paradigms', () => {
    const chartrenderer = shallow(<ChartRenderer libraryManager={getMockLibraryManager()}/>);
    expect(chartrenderer.instance().props.libraryManager.calledMethods.length).toEqual(1);
    expect(chartrenderer.instance().props.libraryManager.calledMethods.includes('getAttr')).toEqual(true);
  });

  it('changes increase size of the chart by 50 when + button is clicked ' +
    'and decrease by 50 when -button is clicked', () => {
    const chartrenderer = shallow(<ChartRenderer libraryManager={getMockLibraryManager()}/>);
    //default is 600
    expect(chartrenderer.instance().state.size).toEqual(600);
    //+ button is clicked => 650
    shallow(chartrenderer.find('Button').nodes[0]).simulate('click', {preventDefault(){}});
    expect(chartrenderer.instance().state.size).toEqual(650);
    //- button is clicked => 600
    shallow(chartrenderer.find('Button').nodes[1]).simulate('click', {preventDefault(){}});
    expect(chartrenderer.instance().state.size).toEqual(600);
    //+ button is clicked again => 550
    shallow(chartrenderer.find('Button').nodes[1]).simulate('click', {preventDefault(){}});
    expect(chartrenderer.instance().state.size).toEqual(550);
  });

  it('changes the state of view mode when handleChange is triggered', ()=> {
    const chartrenderer = shallow(<ChartRenderer libraryManager={getMockLibraryManager()}/>);

    chartrenderer.instance().handleChangeView('programminglanguages');
    expect(chartrenderer.instance().state).toEqual({view: 'programminglanguages', size: 600});
    chartrenderer.instance().handleChangeView('paradigms');
    expect(chartrenderer.instance().state).toEqual({view: 'paradigms', size: 600});
  });
});

