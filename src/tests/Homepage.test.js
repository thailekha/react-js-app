import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import Homepage from '../components/Homepage';

//https://github.com/airbnb/enzyme/blob/master/docs/api/selector.md

describe('Component: ', () => {
  //calling a method in this mock will append a ReactComponent, which is used to do test and confirm that method is called
  const mockLibraryManagerWithNoLibrary = {
    setLibraryHandler(){},create(){},delete(){},getAttr(){},addPL(){},editPL(){},getPL(){},deletePL(){},getRelatedPDs(){},getPDID(){},addPD(){},editPD(){},getPD(){},deletePD(){},
    libraryIsAvailable: false
  };

  var mockLibraryManagerWithLibrary = {
    calledMethods: [],
    previouslyCalledMethod(m){
      if(!this.calledMethods.includes(m)) {
        this.calledMethods.push(m);
      }
    },
    setLibraryHandler(){
      this.previouslyCalledMethod('setLibraryHandler');
    },
    create(){
      this.previouslyCalledMethod('create');
    },
    delete(){
      this.previouslyCalledMethod('delete');
    },
    getAttr(attr){
      this.previouslyCalledMethod('getAttr');
      return {
        "id": 0,
        "email": "abc@yahoo.sample.com",
        "name": "Mock 1",
        "public": true,
        "paradigms": [],
        "programminglanguages": [],
        "havings": []
      }[attr];
    },
    addPL(){
      this.previouslyCalledMethod('addPL')
    },
    editPL(){
      this.previouslyCalledMethod('editPL')
    },
    getPL(){
      this.previouslyCalledMethod('getPL')
    },
    deletePL(){
      this.previouslyCalledMethod('deletePL')
    },
    getRelatedPDs(){
      this.previouslyCalledMethod('getRelatedPDs')
    },
    getPDID(){
      this.previouslyCalledMethod('getPDID')
    },
    addPD(){
      this.previouslyCalledMethod('addPD')
    },
    editPD(){
      this.previouslyCalledMethod('editPD')
    },
    getPD(){
      this.previouslyCalledMethod('getPD')
    },
    deletePD(){
      this.previouslyCalledMethod('deletePD')
    },
    libraryIsAvailable: true
  };

  //const minProps = {};
  //TODO put these into function
  const defaultHomepage = shallow(<Homepage/>);
  const homapageWithLibManager = shallow(<Homepage libraryManager={mockLibraryManagerWithNoLibrary}/>);
  const homapageWithLibManagerAndLibrary = shallow(<Homepage libraryManager={mockLibraryManagerWithLibrary}/>);

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

  it('has libraryManager in props with libraryIsAvailable set to True, "view: "all"" in state, header, view mode, and chart', ()=> {
    console.log(homapageWithLibManagerAndLibrary.debug());
    const calledMethods1 =  homapageWithLibManagerAndLibrary.instance().props.libraryManager.calledMethods;
    console.log(calledMethods1);
    expect(calledMethods1.length).toEqual(1);
    expect(calledMethods1.includes('getAttr')).toEqual(true);

    //selection box and options
    expect(homapageWithLibManagerAndLibrary.find('select').length).toEqual(1);
    expect(homapageWithLibManagerAndLibrary.find('option').length).toEqual(3);
    
    // expect(homapageWithLibManagerAndLibrary.find('option').get(0).html().includes('<option value="all">')).toEqual(true);
    // expect(homapageWithLibManagerAndLibrary.find('option').get(1).html().includes('<option value="programminglanguages">')).toEqual(true);
    // expect(homapageWithLibManagerAndLibrary.find('option').get(2).html().includes('<option value="paradigms">')).toEqual(true);

    //chart
    expect(homapageWithLibManagerAndLibrary.find('PieChart').length).toEqual(1);
    expect(homapageWithLibManagerAndLibrary.find('Legend').length).toEqual(1);

    //change view mode
    homapageWithLibManagerAndLibrary.find('select').simulate('change',{target: { value : 'programminglanguages'}});
    expect(homapageWithLibManagerAndLibrary.instance().state).toEqual({view: 'programminglanguages'});
  });
});