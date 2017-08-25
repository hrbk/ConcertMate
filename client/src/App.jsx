import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import Filters from './components/Filters.jsx';
import Map from './components/Map.jsx';
import Playlist from './components/Playlist.jsx';
import Concerts from './components/Concerts.jsx';
import ReactScrollbar from 'react-scrollbar-js';
import {PageHeader} from 'react-bootstrap';
import { connect } from 'react-redux';
import { setSpotifyToken, setArtist, setSongkickEvents, setArtistId } from './redux/actionCreators.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.requestSongkickEvents = this.requestSongkickEvents.bind(this);
    this.handleArtistClick = this.handleArtistClick.bind(this);
  }

  componentDidMount() {
    this.authenticateSpotify();
    this.requestSongkickEvents();
  }

  authenticateSpotify() {
    if (window.location.hash) {
      let hash = window.location.hash;
      let token = hash.split('&')[0].split('=')[1];
      this.props.handleSetSpotifyToken(token);

      axios.post('/spotify/login', {
          data: token
      })
      .catch((error) => {
        console.log(error);
      });

    } else {
      axios.get('/spotify/login')
        .then((response) => {
          let loginUrl = response.data;
          window.location = loginUrl;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  handleArtistClick(clickedArtist) {
    this.props.handleSetArtist(clickedArtist);
    this.requestArtistId(clickedArtist);
  }

  requestArtistId(clickedArtist = this.props.artist) {
    if (clickedArtist) {
      let data = {
          artist: clickedArtist,
          token: this.props.token
        };

        axios.post('/spotify/search', data)
          .then((res) => {
            this.props.handleSetArtistId(res.data.artistId);
          })
          .catch((err) => {
            console.log(err);
          });

    } else {
      this.props.handleSetArtist();
    }
  }


  requestSongkickEvents() {
    let formattedDate = this.props.date.format('YYYY-MM-DD');
    let latitude = this.props.mapCenter.lat;
    let longitude = this.props.mapCenter.lng;

    axios.post('/songkick/', {
      date: formattedDate,
      lat: latitude,
      lng: longitude
    })
      .then((data) => {
        this.props.handleSetSongkickEvents(data.data);
        this.props.handleSetArtist(data.data[0].performance[0].artist.displayName);

        this.requestArtistId();
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  }

 render() {

    const scrollbar = {
      width: 555,
      height: 290,
    };

    const header = {
      fontFamily: 'futura',
      fontSize: 70,
      color: '#CD3F2A'
    };

    return (

      <Grid>
        <Row>
          <Col md={12}>
          <div>
            <PageHeader style={header}>ConcertMate <small>discover upcoming concerts around you</small></PageHeader>
          </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Filters requestEvents={this.requestSongkickEvents} />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Map />
          </Col>
          <Col md={6}>
            <Playlist />
            <ReactScrollbar style={scrollbar}>
              <Concerts events={this.props.events} handleArtistClick={this.handleArtistClick}/>
            </ReactScrollbar>
          </Col>
        </Row>
      </Grid>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    'token': state.token, //allows this.props.token to exist and be accessible in component
    'date': state.date, //need access to date here but don't need to edit its state here, so no dispatch method associated
    'artist': state.artist,
    'events': state.events, 
    'artistId': state.artistId, 
    'mapCenter': state.mapCenter
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleSetSpotifyToken(token = '') { //think of this as used in place of 'this.setState()'
    dispatch(setSpotifyToken(token)); //action creator dispatched and root reducer called: { type: 'SET_SPOTIFY_TOKEN', value: token } equivalent
  }, 
  handleSetArtist(artist = '') {
    dispatch(setArtist(artist));
  },
  handleSetSongkickEvents(events = []) {
    dispatch(setSongkickEvents(events));
  },
  handleSetArtistId(artistId = '') {
    dispatch(setArtistId(artistId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);