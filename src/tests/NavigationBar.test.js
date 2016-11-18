import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import NavigationBar  from '../components/NavigationBar';

describe('Component: NavigationBar', () => {

  it('has 1 Nav items (React bootstrap)', () => {
    var nav = shallow(<NavigationBar navItems={['A','B','C','D','E']} />);
    //console.log(nav.debug());
    expect(nav.find('Nav').length).toEqual(1);
  });

});