import React from 'react';
// 
// import {markerStyle, markerStyleHover} from './MarkerStyles.js';

export default class Markers extends React.Component {
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
    let style = this.props.$hover || this.state.name === this.props.hovered ? markerStyleHover : markerStyle;
    return (
      <div style={style}></div>
    )
  }
}
const markerStyle = {
  position: 'absolute',
  width: 20,
  height: 20,
  left: -10,
  right: -10,

  border: '5px solid #CD5C5C',
  borderRadius: 20,
  backgroundColor: 'white'
};
const markerStyleHover = {
  position: 'absolute',
  width: 20,
  height: 20,
  left: -10,
  right: -10,

  border: '5px solid #0000CD',
  borderRadius: 20,
  backgroundColow: 'white'
}