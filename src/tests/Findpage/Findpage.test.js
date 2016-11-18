import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import {getMockLibraryManager} from '../testUtils';
import Findpage from '../../components/Findpage/Findpage';


describe('Component: Findpage', () => {

  it('has InputTextBox so that user can type in query, ' +
    'SelectBox to let user choose mode, and QueryResult to display results', () => {
    const findpage = shallow(<Findpage libraryManager={getMockLibraryManager()}/>);
    //default state
    expect(findpage.instance().state).toEqual({findMode: 'name', sort: 'alphabetical', result: []});
    expect(findpage.find('InputTextBox').length).toEqual(1);
    expect(findpage.find('SelectBox').length).toEqual(1);
    expect(findpage.find('QueryResult').length).toEqual(1);
  });

  it('has another selectbox when "content" is chosen as find mode', () => {
    const findpage = shallow(<Findpage libraryManager={getMockLibraryManager()}/>);
    findpage.instance().setState({findMode: 'content'});

    expect(findpage.find('InputTextBox').length).toEqual(1);
    expect(findpage.find('SelectBox').length).toEqual(2);
    expect(findpage.find('QueryResult').length).toEqual(1);
  });

  it('calls search on libraryManager when handleFind is triggered', () => {
    const findpage = shallow(<Findpage libraryManager={getMockLibraryManager()}/>);
    findpage.instance().handleFind();
    expect(findpage.instance().props.libraryManager.calledMethods.length).toEqual(1);
    expect(findpage.instance().props.libraryManager.calledMethods.includes('search')).toEqual(true);
  });

});