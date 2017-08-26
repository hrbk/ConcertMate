import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import Filters from './components/Filters.jsx';
import Map from './components/Map.jsx';
import Playlist from './components/Playlist.jsx';
import Concerts from './components/Concerts.jsx';
import ReactScrollbar from 'react-scrollbar-js';
import { PageHeader, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setSpotifyToken, setArtist, setSongkickEvents, setArtistId } from './redux/actionCreators.js';
import './styles/main.scss';

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
    console.log('COORDS', latitude, longitude);
    axios.post('/songkick/', {
      date: formattedDate,
      lat: latitude,
      lng: longitude,
      city: this.props.searchTerm
    })
      .then((data) => {
        this.props.handleSetSongkickEvents(data.data);
        this.props.handleSetArtist(data.data[0].headline);
        this.requestArtistId();
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  }

  popularityFilter() {
    console.log('EVENTS', this.props.events);
  }

 render() {
    const scrollbar = {
      width: '100%',
      height: '290',
    };

    const header = {
      fontFamily: 'futura',
      fontSize: 70,
      color: '#CD3F2A'
    };

    return (

      <div className="concert-mate-app">
        <div className="container">
          <Row>
            <Col md={6}>
              <Navbar.Header style={header}>
                <Navbar.Brand>
                  <a href="/">ConcertMate</a><small>discover upcoming concerts around you</small>
                </Navbar.Brand>
              </Navbar.Header>
            </Col>
            <Col md={6}>
              <Filters requestEvents={this.requestSongkickEvents} />
            </Col>
          </Row>
        </div>
        <Row className="map-container">
          <Map />
        </Row>
        <div className="playlist-container">
          <Playlist />
            <div id="concert-container">
              <Concerts events={this.props.events} handleArtistClick={this.handleArtistClick} popularityFilter={this.popularityFilter}/>
            </div>
        </div>
      </div>

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
    'mapCenter': state.mapCenter,
    'searchTerm': state.searchTerm
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
