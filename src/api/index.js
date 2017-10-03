import config from './config';

const { apiKey } = config;

const BASE_URL = 'http://ws.audioscrobbler.com/2.0/';
const GEO_TOP_ARTIST_URL = `?method=geo.gettopartists&country=:country&api_key=${apiKey}&format=json&limit=5`

function getArtists(country) {
  const url = BASE_URL + GEO_TOP_ARTIST_URL.replace(':country', country);
  return fetch(url)
    .then(res => res.json())
    .then(json => json.topartists.artist)
}

export default getArtists;
