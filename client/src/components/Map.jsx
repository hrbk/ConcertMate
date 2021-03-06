import React from 'react';
import GoogleMapReact from 'google-map-react';
import GoogleMapMarkers from 'google-map-react';
import Markers from './Markers.jsx';
import { connect } from 'react-redux';
import { setMapCenter } from '../redux/actionCreators.js';

const style = {

}

const Map = (props) => {

  let markers = props.events.map((event) => {
    return <Markers name={event.venue} lat={event.latitude} lng={event.longitude} />
  });

  return (
    <div id='map'>
      <GoogleMapReact
        defaultCenter={{lat: 37.783607, lng:-122.408967}}
        center={props.mapCenter}
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
