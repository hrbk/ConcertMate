import React from 'react';
import { connect } from 'react-redux';
import { handleHover } from '../redux/actionCreators';
import {markerStyle, markerStyleHover} from './MarkerStyles.js';

const Markers = (props) => {
  let style = props.$hover || props.name === props.hoveredEvent ? markerStyleHover : markerStyle;
  return (
    <div onMouseEnter={() => props.handleHoverChange(props.name)} onMouseLeave={() => props.handleHoverChange()} style={style}></div>
  )
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
