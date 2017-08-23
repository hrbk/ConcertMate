import React from 'react';
import axios from 'axios';
import ConcertEntry from './ConcertEntry.jsx';
import {ListGroup} from 'react-bootstrap';
import {Panel} from 'react-bootstrap';

const Concerts = (props) => {

  return (
    <Panel collapsible defaultExpanded header="Nearby Concerts" bsStyle="info">
      <ListGroup fill>
        {props.events.map((event, i) => {
          return <ConcertEntry event={event} key={i} />
        })}
      </ListGroup>
    </Panel>

  )
}

export default Concerts;
