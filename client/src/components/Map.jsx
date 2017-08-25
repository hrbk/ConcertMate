import React from 'react';
import GoogleMapReact from 'google-map-react';
import GoogleMapMarkers from 'google-map-react';
import Markers from './Markers.jsx';
import { connect } from 'react-redux';
import { setMapCenter } from '../redux/actionCreators.js';

const style = {
  position: 'fixed',
  overflow: 'visible',
  top: 190,
  left: 65,
  width: '45%',
  height: '70%',
  margin: 0,
  padding: 0
}

const Map = (props) => {
  let markers = props.events.map((event) => {
    return {
      lat: event.location.lat,
      lng: event.location.lng,
      name: event.venue.displayName
    }
  })
  .map((loc) => {
    return <Markers name={loc.name} lat={loc.lat} lng={loc.lng} />
  });
  return (
    <div style={style}>
      <GoogleMapReact
        defaultCenter={props.mapCenter}
        defaultZoom={13}>
        {markers}
      </GoogleMapReact>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    'mapCenter': state.mapCenter,
    'events': state.events
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleSetMapCenter(mapCenter) {
    dispatch(setMapCenter(mapCenter));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Map);
