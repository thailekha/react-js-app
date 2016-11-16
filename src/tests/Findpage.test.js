import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import {getMockLibraryManager} from './testUtils';
import Findpage from '../components/Findpage/Findpage';


describe('Component: Findpage', () => {

  it('has input field, submit button, selectbox having 2 options to let user choose mode', () => {
    const findpage = shallow(<Findpage />);
    //default state
    expect(findpage.instance().state).toEqual({find: '', findMode: 'name', sort: 'alphabetical', result: []});
    expect(findpage.find('input').length).toEqual(1);
    expect(findpage.find('Button').length).toEqual(1);
    expect(findpage.find('select').length).toEqual(1);
    expect(findpage.find('select').find('option').length).toEqual(2);
  })

  it('update find state when user type in something',() => {
    const findpage = shallow(<Findpage />);
    findpage.find('input').simulate('change', {
      target: {value: 'something typed'},
      preventDefault(){}
    });
    expect(findpage.instance().state.find).toEqual('something typed');
  })

  it('has another selectbox having 2 options (relevance,alphabetical) when "content" is chosen as find mode (4 options in total)', () => {
    const findpage = shallow(<Findpage />);
    findpage.find('select').simulate('change', {
      target: {value: 'content'},
      preventDefault(){}
    });

    expect(findpage.instance().state.findMode).toEqual('content');
    expect(findpage.find('select').length).toEqual(2);
    expect(findpage.find('option').length).toEqual(4);
  })

  it('calls getAttr on libraryManager when user clicks submit button only if the user has typed something in the input field',() => {
    const findpage = shallow(<Findpage libraryManager={getMockLibraryManager()}/>);

    //redefine handleFind method (FAILED)
    // findpage.instance().handleFindCalled = false;
    // findpage.instance().handleFind = function(){
    //   findpage.instance().handleFindCalled = true;
    // }
    //console.log(typeof findpage.instance().handleFind.__reactBoundMethod);
    // for(var i in findpage.instance().handleFind) {
    //   console.log(i);
    // }
    // for(var i in findpage.instance()) {
    //   console.log(i);
    // }

    findpage.find('Button').simulate('click');
    expect(findpage.instance().props.libraryManager.calledMethods.length).toEqual(0);

    //type something in and click submit button
    findpage.find('input').simulate('change', {
      target: {value: 'something typed'},
      preventDefault(){}
    });
    findpage.find('Button').simulate('click');

    expect(findpage.instance().props.libraryManager.calledMethods.length).toEqual(1);
    expect(findpage.instance().props.libraryManager.calledMethods.includes('getAttr')).toEqual(true);

  })

});