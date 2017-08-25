import React from 'react';
import renderer from 'react-test-renderer';
import Playlist from '../client/src/components/Playlist.jsx';

xdescribe('<Playlist />', () => {
  it('should render a Playlist componenet', () => {
    const component = renderer.create(<Playlist />).toJSON();
    expect(component).toMatchSnapshot();
  });
});