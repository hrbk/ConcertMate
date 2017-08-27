import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import App,   { UnwrappedApp } from '../client/src/App.jsx';
import Filters from '../client/src/components/Filters.jsx';
import Map from '../client/src/components/Map.jsx';
import Playlist from '../client/src/components/Playlist.jsx';
import ReactScrollbar from 'react-scrollbar-js';
import Concerts from '../client/src/components/Concerts.jsx';
import { NavbarBrand } from 'react-bootstrap';
import { Provider } from 'react-redux';
import store from '../client/src/redux/store';

describe('<App />', () => {
  it('should render correctly', () => {
    const component = shallow(<UnwrappedApp />);
    expect(component).toMatchSnapshot();
  });

  it('should contain Filters, Map, Playlist, ReactScrollbar, Concerts', () => {
    const component = shallow(<UnwrappedApp />);
    expect(component
        .containsAnyMatchingElements([
        <Filters />,
        <Map />,
        <Playlist />,
        <ReactScrollbar />
      ])).toEqual(true);
  });

  it('should render brand with ConcertMate', () => {
    const component = shallow(<UnwrappedApp />);
    expect(component.find(NavbarBrand).find('a').text()).toEqual('ConcertMate');
  });

});
