import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import Deleter from '../../components/Profilepage/Deleter';

const getMockProps = function(spy) {
  return {
    delete: function() {
      spy.push(true);
    }
  }
}

describe('Component: Deleter', () => {
  it('has "view" state to control toggling the set of buttons, 1 button is available initially', () => {
    var spy = [];
    const deleter = shallow(<Deleter libraryManager={getMockProps(spy)}/>);
    expect(deleter.instance().state).toEqual({view: 'normal'});
    expect(deleter.find('Button').length).toEqual(1);
  })

  it('changes state to "delete" when having "normal" state and the button is clicked,' +
    ' the button is replaced with 2 other buttons in the new state', () => {
    var spy = [];
    const deleter = shallow(<Deleter libraryManager={getMockProps(spy)}/>);
    expect(deleter.instance().state).toEqual({view: 'normal'});
    deleter.find('Button').simulate('click');

    //state changed
    expect(deleter.instance().state).toEqual({view: 'delete'});
    //2 new buttons
    expect(deleter.find('Button').length).toEqual(2);
  });

  it('toggles back to the "normal" state when having "delete" state and the second of the buttons is clicked', () => {
    var spy = [];
    const deleter = shallow(<Deleter libraryManager={getMockProps(spy)}/>);
    deleter.instance().setState({view: "delete"});
    //Find the button
    var button = deleter.find('Button').nodes[1];
    //Wrap it using shallow
    var renderedButton = shallow(button);
    //Click it
    renderedButton.simulate('click');
    //test the state of deleter
    expect(deleter.instance().state).toEqual({view: 'normal'});
  });

  it('calls delete on libraryManager in props when having "delete" state and the first of the buttons is clicked', () => {
    var spy = [];
    const deleter = shallow(<Deleter libraryManager={getMockProps(spy)}/>);
    deleter.instance().setState({view: "delete"});

    expect(spy.length).toEqual(0);
    shallow(deleter.find('Button').nodes[0]).simulate('click', {
      preventDefault(){
      }
    });
    expect(spy.length).toEqual(1);
    expect(spy[0]).toEqual(true);

  });
});