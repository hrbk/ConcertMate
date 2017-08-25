import React from 'react';
import { connect } from 'react-redux';
import { handleHover } from '../redux/actionCreators';
import {markerStyle, markerStyleHover} from './MarkerStyles.js';

class Markers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: this.props.lat,
      lng: this.props.lng,
      name: this.props.name
    }
  }

  render() {
    // if the marker itself is being hovered or if the name of the venue corresponding to the
    // marker is the same as the name passed from the concert component, change the style accordingly
    // also, it's literally just a css circle. you could probably add an image or something 
    let style = this.props.$hover || this.props.name === this.props.hoveredEvent ? markerStyleHover : markerStyle;
    return (
      <div onMouseEnter={() => this.props.handleHoverChange(this.props.name)} onMouseLeave={() => this.props.handleHoverChange()} style={style}></div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    'hoveredEvent': state.hoveredEvent
  }
};

const mapDispatchToProps = (dispatch) => ({
  handleHoverChange(venueName = '') {
    dispatch(handleHover(venueName))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Markers);
