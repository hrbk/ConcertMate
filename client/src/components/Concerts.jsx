import React from 'react';
import axios from 'axios';
import ConcertEntry from './ConcertEntry.jsx';
import {ListGroup} from 'react-bootstrap';
import {Panel, Button} from 'react-bootstrap';
import { connect } from 'react-redux';

const Concerts = (props) => {
  return (

    <Panel collapsible defaultExpanded header={`Nearby Concerts`}>
      <ListGroup fill>
        {props.events.map((event, i) => {
          return <ConcertEntry event={event} key={i} handleArtistClick={props.handleArtistClick}/>
        })}
      </ListGroup>
    </Panel>
  )
}

const mapStateToProps = (state) => {
  return {
    'events': state.events
  }
}

export const UnwrappedConcerts = Concerts;
export default connect(mapStateToProps)(Concerts);
