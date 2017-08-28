import React from 'react';
import renderer from 'react-test-renderer';
import Playlist, { UnwrappedPlaylist } from '../client/src/components/Playlist.jsx';

describe('<Playlist />', () => {
  it('should render a Playlist componenet', () => {
    const component = renderer.create(<UnwrappedPlaylist />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
