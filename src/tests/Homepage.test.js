import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import {Homepage,CreateBox} from '../components/Homepage';

//https://github.com/airbnb/enzyme/blob/master/docs/api/selector.md

function getMockLibraryManagerWithNoLibrary() {
  return {
    setLibraryHandler(){
    }, create(){
    }, delete(){
    }, getAttr(){
    }, addPL(){
    }, editPL(){
    }, getPL(){
    }, deletePL(){
    }, getRelatedPDs(){
    }, getPDID(){
    }, addPD(){
    }, editPD(){
    }, getPD(){
    }, deletePD(){
    },
    libraryIsAvailable: false
  };
}

function getMockLibraryManagerWithLibrary(){
  return {
    calledMethods: [],
    previouslyCalledMethod(m){
      if (!this.calledMethods.includes(m)) {
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
}

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
    const homapageWithLibManager = shallow(<Homepage libraryManager={getMockLibraryManagerWithNoLibrary()}/>);
    console.log(homapageWithLibManager.debug());
    expect(homapageWithLibManager.find('CreateBox').length).toEqual(1);
  })

  it('has libraryManager in props with libraryIsAvailable set to True, "view: "all"" in state, header, view mode, and chart', ()=> {
    const homapageWithLibManagerAndLibrary = shallow(<Homepage libraryManager={getMockLibraryManagerWithLibrary()}/>);
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
    const homapageWithLibManagerAndLibrary = shallow(<Homepage libraryManager={getMockLibraryManagerWithLibrary()}/>);
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

describe('Component: CreateBox', () => {
  //TODO edge cases ? eg. no libraryManager
  it('has a form with input field which is kept track by a state', ()=> {
    const createbox = shallow(<CreateBox libraryManager={getMockLibraryManagerWithLibrary()} />);
    expect(createbox.instance().state).toEqual({name:''});
    expect(createbox.find('form').length).toEqual(1);
    expect(createbox.find('input').length).toEqual(1);

  });

  it('changes state when user types', ()=> {
    const createbox = shallow(<CreateBox libraryManager={getMockLibraryManagerWithLibrary()} />);
    createbox.find('input').simulate('change', {
      target: {value: 'something typed'}
    });
    //state will change
    expect(createbox.instance().state).toEqual({name:'something typed'});
    //click the button
  });

  it('call libraryManager.create only when user has typed in something',()=>{
    const createbox = shallow(<CreateBox libraryManager={getMockLibraryManagerWithLibrary()} />);
    //click submit button
    createbox.find('Button').simulate('click',{
      preventDefault(){} //NEEDED BECAUSE A SIMULATED EVENT DOES NOT HAVE THIS METHOD
    });
    expect(createbox.instance().props.libraryManager.calledMethods.length).toEqual(0);
    //type in something and click submit button
    createbox.find('input').simulate('change', {
      target: {value: 'something typed'},
    });
    createbox.find('Button').simulate('click',{
      preventDefault(){} //NEEDED BECAUSE A SIMULATED EVENT DOES NOT HAVE THIS METHOD
    });
    expect(createbox.instance().props.libraryManager.calledMethods.length).toEqual(1);
    expect(createbox.instance().props.libraryManager.calledMethods.includes('create')).toEqual(true);
  });
});