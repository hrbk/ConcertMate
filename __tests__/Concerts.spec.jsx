import React from 'react';
import renderer from 'react-test-renderer';
import Filters from '../client/src/components/Filters.jsx';
import DatePicker from 'react-datepicker';
import { shallow, mount } from 'enzyme';
import Concerts, { UnwrappedConcerts } from '../client/src/components/Concerts.jsx';
import ConcertEntrys, { UnWrappedConcertEntry } from '../client/src/components/ConcertEntry.jsx';
import {ListGroup} from 'react-bootstrap';

describe('<Concerts />', () => {
  it('should render correctly', () => {
    const mockedEvents = [];
    const component = renderer.create(<UnwrappedConcerts events={mockedEvents} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render 10 ConcertEntrys given 10 events', () => {
    const mockedEvent = {"ageRestriction":"All Ages","displayName":"Roy Gaines at Biscuits and Blues (August 26, 2017)","id":30615579,"popularity":0.00014,"uri":"http://www.songkick.com/concerts/30615579-roy-gaines-at-biscuits-and-blues?utm_source=46052&utm_medium=partner"};
    const mockedEvents = [];
    for (var i = 0; i < 10; i++) {
      mockedEvents.push(mockedEvent);
    }
    const component = shallow(<UnwrappedConcerts events={mockedEvents} />);
    expect(component.find(ConcertEntrys).length).toEqual(10);
  });
})
