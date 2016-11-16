import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import {getMockLibraryManager,getMockLibraryManagerWithData} from './testUtils';
import BrowsepageContainer from '../components/Browsepage/Browsepage';
import {PLContent,PDContent} from '../components/Browsepage/Content';
import {BrowsepageCreateEditBoxPL, BrowsepageCreateEditBoxPD} from '../components/Browsepage/CreateEditBox';
import SubNavigationBar from '../components/Browsepage/SubNavigationBar';

describe('Component: BrowsepageContainer', () => {

  it('has subnavigationbar ', () => {
    var browsepage = shallow(<BrowsepageContainer libraryManager={getMockLibraryManagerWithData}/>);
    expect(browsepage.find('SubNavigationBar').length).toEqual(1);
  });

  it('renders the child component in props',() => {
    const props = getMockLibraryManagerWithData();
    //children.props.route.sendToChildren
    var CreateEditBoxPL = React.cloneElement(BrowsepageCreateEditBoxPL, {
      route: {sendToChildren: "create"},
      libraryManager: props,
      boxmode: "create"
    });
    shallow(<CreateEditBoxPL/>).instance();
    expect(shallow(<CreateEditBoxPL/>).instance()).to.be.instanceOf(BrowsepageCreateEditBoxPL);
    var browsepageWithBrowsepageCreateBoxPL = shallow(<BrowsepageContainer children={(<CreateEditBoxPL />)} libraryManager={props}/>);
    console.log(browsepageWithBrowsepageCreateBoxPL.debug());
    expect(browsepageWithBrowsepageCreateBoxPL.find('BrowsepageCreateEditBoxPL').length).toEqual(1);

    var CreateEditBoxPD = React.cloneElement(BrowsepageCreateEditBoxPD, {
      route: {sendToChildren: "create"},
      libraryManager: props,
      boxmode: "create"
    });

    var browsepageWithBrowsepageCreateBoxPD = shallow(<BrowsepageContainer children={CreateEditBoxPD} libraryManager={props}/>);
    expect(browsepageWithBrowsepageCreateBoxPD.find('BrowsepageCreateEditBoxPD').length).toEqual(1);

    //routeParams['id']
    //var browsepageWithBrowsepageEditBoxPD = shallow(<BrowsepageContainer children={BrowsepageCreateEditBoxPD} sendToChildren="edit" libraryManager={props}/>);
    //edit mode cannot be tested here since it requires the compoenent to parse route params (as implemented)

    //var browsepageWithPDContent = shallow(<BrowsepageContainer children={PDContent} libraryManager={props}/>);
  })
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