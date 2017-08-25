import { HANDLE_HOVER, SET_SPOTIFY_TOKEN, SET_DATE, SET_ARTIST, SET_SONGKICK_EVENTS, SET_ARTIST_ID, SET_SEARCH_TERM, SET_MAP_CENTER } from './actions';
import moment from 'moment';

/**INITIAL STATE**/
const initialState = {
	'hoveredEvent': '',
	'token': undefined,
	'date': moment(),
	'artist': '',
	'events': [],
	'artistId': '',
	'mapCenter': {lat: 37.783607, lng:-122.408967},
	'searchTerm': '',
	'markerLocs': []
};

const rootReducer = (state = initialState, action) => {
	
	switch (action.type) {
		case HANDLE_HOVER:
			return reduceHandleHover(state, action);
		case SET_SPOTIFY_TOKEN:
			return reduceSetSpotifyToken(state, action);
		case SET_DATE:
			return reduceSetDate(state, action);
		case SET_ARTIST:
			return reduceSetArtist(state, action);
		case SET_SONGKICK_EVENTS:
			return reduceSetSongkickEvents(state, action);
		case SET_ARTIST_ID:
			return reduceSetArtistId(state, action);
		case SET_SEARCH_TERM:
			return reduceSetSearchTerm(state, action);
		case SET_MAP_CENTER:
			return reduceSetMapCenter(state, action);
		default:
			return state;
	}
}

const reduceHandleHover = (state, action) => {
	return Object.assign({}, state, {'hoveredEvent': action.value});
}

const reduceSetSpotifyToken = (state, action) => {
	return Object.assign({}, state, {'token': action.value});
}

const reduceSetDate = (state, action) => {
	return Object.assign({}, state, {'date': action.value});
}

const reduceSetArtist = (state, action) => {
	return Object.assign({}, state, {'artist': action.value});
}

const reduceSetSongkickEvents = (state, action) => {
	return Object.assign({}, state, {'events': action.value});
}

const reduceSetArtistId = (state, action) => {
	return Object.assign({}, state, {'artistId': action.value})
}

const reduceSetSearchTerm = (state, action) => {
	return Object.assign({}, state, {'searchTerm': action.value});
}

const reduceSetMapCenter = (state, action) => {
	return Object.assign({}, state, {'mapCenter': action.value});
}

export default rootReducer;