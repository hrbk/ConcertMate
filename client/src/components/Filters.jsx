import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {Navbar, FormGroup, FormControl, Button} from 'react-bootstrap';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import axios from 'axios';
import { setDate, setSearchTerm, setMapCenter } from '../redux/actionCreators.js';
import { connect } from 'react-redux';
import styled from 'styled-components';


// ignore the fact that this is called Favorites but the file is called Filters
const Filters = (props) => {
  // beginning of search functionality. we wanted to implement google search to be able to
  // autocomplete addresses but hey that's your job now
  const handleSubmit = (loc) => {

    geocodeByAddress(loc)
    .then(results => getLatLng(results[0]))
    .then(latLng => {

      let userLoc = {
        lat: latLng.lat,
        lng: latLng.lng
      }
      props.handleSetMapCenter(userLoc); //set state of mapCenter prop
      props.requestEvents(); //getSongkickEvents

    })
    .catch(error => console.log('error', error))
  }

  const StyledDatePicker = styled(DatePicker)`
    background-image: url(https://www.shareicon.net/data/512x512/2015/09/02/94682_calendar_512x512.png);
    background-size: contain;
    background-repeat: no-repeat;
    padding-top: 3.5px;
    float: left;
    padding: 15px;
    width: 44px;
    color: rgba(0,0,0,0);
  `;

  const inputProps = {
      value: props.searchTerm,
      onChange: props.handleSetSearchTerm,
      class: 'search_input',
      placeholder: 'Location'
  }

  const navStyle = {
    display: 'flex',
    alignItems: 'center'
  }

  const placesAutocompleteStyles = {
     root: { border: '1pt solid #ccc' },
     input: { width: '100%' }
   }


  return (
    <div className="navigation">
      <Navbar.Form pullRight style={navStyle}>
        <StyledDatePicker
          dateFormat="MM/DD/YYYY"
          selected={props.date} //automatically passed into handleSetData
          onChange={props.handleSetDate} />

        <PlacesAutocomplete
          onEnterKeyDown={handleSubmit}
          inputProps={inputProps}
          highlightFirstSuggestion={true}
          googleLogo={false}
         styles={placesAutocompleteStyles} />

        <Button type="submit" onClick={() => handleSubmit(props.searchTerm)}>Submit</Button>
      </Navbar.Form>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    'date': state.date, //allows this.props.date to exist and be accessible in component
    'searchTerm': state.searchTerm,
    'mapCenter': state.mapCenter
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleSetDate(date = moment()) { //think of this as used in place of 'this.setState()'
    dispatch(setDate(date)); //action creator dispatched and reducers called: { type: 'SET_SPOTIFY_TOKEN', value: token } equivalent
  },
  handleSetSearchTerm(searchTerm = '') {
    dispatch(setSearchTerm(searchTerm)); //no need for searchTerm.target.value bc googleAutoPlaces handles that
  },
  handleSetMapCenter(mapCenter) {
    dispatch(setMapCenter(mapCenter));
  }
});

export const UnwrapperFilters = Filters;
export default connect(mapStateToProps, mapDispatchToProps)(Filters);
