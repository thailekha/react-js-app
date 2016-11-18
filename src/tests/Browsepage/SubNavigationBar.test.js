import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import SubNavigationBar from '../../components/Browsepage/SubNavigationBar';

describe('Component: SubNavigationBar', () => {
  it('has SelectBox for user to choose mode, and Nav tag', () => {
    const subnavigationbar = shallow(<SubNavigationBar subNavigationItems={[]}/>);

    expect(subnavigationbar.find('SelectBox').length).toEqual(1);
    expect(subnavigationbar.find('Nav').length).toEqual(1);
  })

  it('change to corresponding state when switchBrowsingMode is triggered with an argument that is different from the current browsingMode state', () => {
    const subnavigationbar = shallow(<SubNavigationBar subNavigationItems={[]}/>);

    expect(subnavigationbar.instance().state).toEqual({browsingMode: 'programminglanguages'});
    subnavigationbar.instance().switchBrowsingMode('paradigms');
    expect(subnavigationbar.instance().state).toEqual({browsingMode: 'paradigms'});
  })
});

