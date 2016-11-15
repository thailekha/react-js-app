import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import {getMockLibraryManager,getMockLibraryManagerWithData} from './testUtils';
import BrowsepageContainer from '../components/Browsepage/Browsepage';
import {PLContent,PDContent} from '../components/Browsepage/Content';
import {BrowsepageCreateBoxPL, BrowsepageCreateBoxPD} from '../components/Browsepage/CreateEditBox';
import SubNavigationBar from '../components/Browsepage/SubNavigationBar';

describe('Component: Browsepage', () => {

  it('has subnavigationbar ', () => {
    var browsepage = shallow(<BrowsepageContainer libraryManager={getMockLibraryManagerWithData}/>);
    expect(browsepage.find('SubNavigationBar').length).toEqual(1);
  });

});

// describe('Component: PLContent', () => {
//
//   it('...', ()=>{
//     var plcontent = shallow(<PLContent libraryManager={getMockLibraryManager()} routeParams={{id: "0"}}/>);
//     expect(true).toEqual(false);
//   });
//
// });

// describe('Component: SubNavigationBar', () => {
//
//   it('has 3 nav items', ()=>{
//     var subnav = shallow(<SubNavigationBar />);
//   });
//
// });