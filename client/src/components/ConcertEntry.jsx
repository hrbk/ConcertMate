import React from 'react';
import { connect } from 'react-redux';
import { handleHover } from '../redux/actionCreators';
import { ListGroupItem } from 'react-bootstrap';

const ConcertEntry = (props) => {
  return (
    <ListGroupItem
      style={props.hoveredEvent === props.event.venue ? {backgroundColor: '#dddddd'} : {backgroundColor: 'initial'}}
      header={props.event.performance[0].artist.displayName}
      onClick={() => props.handleArtistClick(props.event.headline)}
      onMouseEnter={() =>  props.handleHoverChange(props.event.venue)}
      onMouseLeave={() => props.handleHoverChange()}>
      <span> {props.event.performance[0].artist.displayName} on {props.event.date.slice(0, 10)} {props.event.time}</span>
      <a href={props.event.uri}> Buy Tickets</a>
    </ListGroupItem>
  )
};

const mapStateToProps = (state) => {
  return {
    'hoveredEvent': state.hoveredEvent,
    'artistId': state.artistId
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleHoverChange(venueName = '') {
    dispatch(handleHover(venueName)); //{ type: 'HANDLE_HOVER', value: venueName } equivalent
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ConcertEntry);

