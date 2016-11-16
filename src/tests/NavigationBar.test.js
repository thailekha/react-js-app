import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import NavigationBar  from '../components/NavigationBar';

describe('Component: NavigationBar', () => {

  it('has navitem, linkcontainer ', () => {
    var nav = shallow(<NavigationBar />);
    //['home', 'browse', 'find', 'profile', 'logout']
    //console.log(nav.debug());
    expect(nav.find('LinkContainer').length).toEqual(5);
    expect(nav.find('NavItem').length).toEqual(5);
  });

});