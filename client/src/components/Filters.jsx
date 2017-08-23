import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {Navbar, FormGroup, FormControl, Button} from 'react-bootstrap';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import axios from 'axios';

// ignore the fact that this is called Favorites but the file is called Filters
class Favorites extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment(),
      radius: 5,
      search: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(search) {
    this.setState({
      search
    });
  }

  // beginning of search functionality. we wanted to implement google search to be able to
  // autocomplete addresses but hey that's your job now
  handleSubmit(loc) {
    geocodeByAddress(loc)
    .then(results => getLatLng(results[0]))
    .then(latLng => console.log('success', latLng))
    .catch(error => console.log('error', error))
    console.log(this.state.search)

  }

  render() {
    const datepicker =  {
      paddingTop: '3.5px'
    }
    const inputProps = {
      value: this.state.search,
      onChange: this.handleSearch,
      class: 'search_input',
      placeholder: 'location',
    }
    return (
      <div>
        <Navbar bsStyle="info">
          <Navbar.Form pullLeft>
            <PlacesAutocomplete
              onEnterKeyDown={this.handleSubmit}
              inputProps={inputProps}
              highlightFirstSuggestion={true}
              googleLogo={false}/>
          </Navbar.Form>
          <Navbar.Form>
          <div style={datepicker}>
        <DatePicker
          dateFormat="MM/DD/YYYY"
          selected={this.props.startDate}
          onChange={this.props.handleDateChange}
        /> </div>
        </Navbar.Form>
        </Navbar>
      </div>
    )
  }
};

export default Favorites;
