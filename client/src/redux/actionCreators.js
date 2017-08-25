import { HANDLE_HOVER, SET_SPOTIFY_TOKEN, SET_DATE, SET_ARTIST, SET_SONGKICK_EVENTS, SET_ARTIST_ID, SET_MAP_CENTER, SET_SEARCH_TERM } from './actions';

export function handleHover(hoveredEvent) {
  return { type: HANDLE_HOVER, value: hoveredEvent };
}

export function setSpotifyToken(token) {
  return {type: SET_SPOTIFY_TOKEN, value: token};
}

export function setDate(date) {
  return {type: SET_DATE, value: date};
}

export function setArtist(artist) {
  return {type: SET_ARTIST, value: artist};
}

export function setSongkickEvents(events) {
  return {type: SET_SONGKICK_EVENTS, value: events};
}

export function setArtistId(artistId) {
  return {type: SET_ARTIST_ID, value: artistId};
}

export function setMapCenter(mapCenter) {
  return {type: SET_MAP_CENTER, value: mapCenter};
}

export function setSearchTerm(searchTerm) {
  return {type: SET_SEARCH_TERM, value: searchTerm};
}
