import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import Homepage from '../components/Homepage';

//https://github.com/airbnb/enzyme/blob/master/docs/api/selector.md

describe('Component: ', () => {
  //calling a method in this mock will append a ReactComponent, which is used to do test and confirm that method is called
  const mockLibraryManagerWithNoLibrary = {
    setLibraryHandler(){

    },
    create(){},
    delete(){},
    getAttr(attr){
      return {
        "id": 0,
        "email": "abc@yahoo.sample.com",
        "name": "Sample repo 1",
        "public": true,
        "paradigms": [],
        "programminglanguages": [],
        "havings": []
      }[attr];
    },
    addPL(){},
    editPL(){},
    getPL(){},
    deletePL(){},
    getRelatedPDs(){},
    getPDID(){},
    addPD(){},
    editPD(){},
    getPD(){},
    deletePD(){},
    libraryIsAvailable: false
  };

  const mockLibraryManagerWithLibrary = {
    setLibraryHandler(){},
    create(){},
    delete(){},
    getAttr(){},
    addPL(){},
    editPL(){},
    getPL(){},
    deletePL(){},
    getRelatedPDs(){},
    getPDID(){},
    addPD(){},
    editPD(){},
    getPD(){},
    deletePD(){},
    libraryIsAvailable: true
  };

  //const minProps = {};
  const defaultHomepage = shallow(<Homepage/>);
  const homapageWithLibManager = shallow(<Homepage libraryManager={mockLibraryManagerWithNoLibrary}/>);
  //const homapageWithLibManagerAndLibrary = shallow(<Homepage libraryManager={mockLibraryManagerWithLibrary}/>);

  it('has no props, has no state, and has 3 empty divs as default', () => {
    console.log(defaultHomepage.debug());
    // console.log('props: ');
    // console.log(defaultHomepage.instance().props);
    // console.log(defaultHomepage.instance().state);
    //console.log(defaultHomepage.instance());
    expect(defaultHomepage.find('.homepage').length).toEqual(1);
    expect(defaultHomepage.find('.homepage').find('div').length).toEqual(4);
    expect(defaultHomepage.instance().props).toEqual({});
    expect(defaultHomepage.instance().state).toEqual({});
  });

  it('has libraryManager in props, "view: "all"" in state', () => {
    console.log(homapageWithLibManager.debug());
    expect(homapageWithLibManager.instance().props).toEqual({
      libraryManager: mockLibraryManagerWithNoLibrary
    });
    expect(homapageWithLibManager.instance().state).toEqual({
      view: 'all'
    });
  })
});