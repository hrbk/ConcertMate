import React from 'react';
import axios from 'axios';
import {Panel} from 'react-bootstrap'
import { connect } from 'react-redux';

const Playlist = (props) => {
	let iframeBaseURL = 'https://open.spotify.com/embed?uri=spotify:';
	let iframeQuery = props.artistId ? 'artist:' + props.artistId + '&theme=black' : 'user:1211115253:playlist:6r1hzKf8a0KYkbt44we1Cl';
	let iframeSRC = iframeBaseURL + iframeQuery;

  return (
  	<div>
	    <Panel collapsible defaultExpanded header="Preview Artist" bsStyle="success">
	    	<iframe src={iframeSRC}
					width="100%" height="95"
					frameBorder="0" allowTransparency="true"></iframe>

	    </Panel>
    </div>
  )
};


const mapStateToProps = (state) => {
  return {
    'artistId': state.artistId //allows this.props.artistId to exist and be accessible in component
  }
}

export default connect(mapStateToProps)(Playlist);
