const Twitter = require("twitter");
const Spotify = require('node-spotify-api');

//console.log('this is loaded');

const twitterKeys = new Twitter({
  consumer_key: 'VqkgHO50xlZkSWcdtdGCcLyoM',
  consumer_secret: 'mxMFRXEuC9d7Gy2Lgk3uxoihNLOGKhtLk4EXTj9lkwVSjpNtI5',
  access_token_key: '918877142112456704-JJ4eNgx56rqmj9lfd4JtlLguTwhmaOi',
  access_token_secret: 'I6RWAcexMHso2OjRZMkKTMWlbNyC7oAJv4PNK4pxxgHU2',
});
const spotify = new Spotify({
  id: '10e9a25eeb814dc68999820491e6a0ef',
  secret: '0957b90920ee42508c1409d4cc6e83ae'
});

module.exports = {
  twitterKeys: twitterKeys,
  spotify: spotify
};
