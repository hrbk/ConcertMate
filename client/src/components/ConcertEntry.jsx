import React from 'react';
import {ListGroupItem} from 'react-bootstrap';

class ConcertEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //artist: ''
    }
  }

  handleClick(clickedArtist) {
    this.props.handleArtistClick(clickedArtist);
  }

  mouseIn(venueName) {
    this.props.handleHover(venueName);
  }

  mouseOut() {
    this.props.handleHover();
  }

  render() {

    return (
      <ListGroupItem
        header={this.props.event.performance[0].artist.displayName}
        onClick={() => this.handleClick(this.props.event.headline)}
        onMouseEnter={() =>  this.mouseIn(this.props.event.venue)}
        onMouseLeave={() => this.mouseOut()}>
        <span> {this.props.event.performance[0].artist.displayName} on {this.props.event.start.date.slice(0, 10)}</span>
        <a href={this.props.event.uri} target='_blank'> Buy Tickets</a>
      </ListGroupItem>
    )
  }

};

export default ConcertEntry;
