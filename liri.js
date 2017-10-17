//
//----------------------------------------------------------------------------------------------------------------------------
//Setting up global variables
const keys = require("./keys.js");
const request = require("request");
const fs = require("fs");
const nodeArg = process.argv;
let _2ndArg = process.argv[2];
let ombdApi = "https://www.omdbapi.com/";
let argStr = '';

//
//----------------------------------------------------------------------------------------------------------------------------
//One object to hold them all! app holds the functions to make the program run
let app = {
  //get tweets is a function the runs the node-twitter-api and returns tweets
  getTweets: () => {
    const params = ({screen_name: "sunbak885", count: 20});
      keys.twitterKeys.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        for (let i=0;i<tweets.length;i++) {
          const output = `-------------------------------\nThe following tweet was created on:\n${tweets[i].created_at} and reads:\n${tweets[i].text}\n`;
          console.log(output);
          fs.appendFile("log.txt", output, function(err) {
            if (err) {
              return console.log(err);
            }
          });
        }
      }
    });
  },
  //getSpotify is a function that runs the node-spotify-api and returns info on a song entered
  getSpotify: () => {
    if (argStr != '') {
      keys.spotify.search({type: 'track', query: argStr}, function(err, data) {
        const spot = data.tracks.items[0];
        const output = `-------------------------------\nThe band you're thinking of is:\n${spot.artists[0].name} and they sing:\n${spot.name} which appears on the album:\n${spot.album.name}. Here's a link to the song, if you'd like to check it out:\n${spot.href}\n`;
        if (err) {
          return console.log(err);
        }
        console.log(output);
        fs.appendFile("log.txt", output, function(err) {
          if (err) {
            return console.log(err);
          }
        });
      });
    } else {
      keys.spotify.search({type: 'track', query: 'The Sign Ace of Base'}, function(err, data) {
        const spot = data.tracks.items[0];
        const output = `Nothing entered, defaulting to...\n-------------------------------\nThe band you're thinking of is:\n${spot.artists[0].name} and they sing:\n${spot.name} which appears on the album:\n${spot.album.name}. Here's a link to the song, if you'd like to check it out:\n${spot.href}\n`;
        if (err) {
          return console.log(err);
        }
        console.log(output);
        fs.appendFile("log.txt", output, function(err) {
          if (err) {
            return console.log(err);
          }
        });
      });
    }
  },
  //getMovie is a function that uses request to make request to the OMBDApi to retrieve info on a movie
  getMovie: () => {
    if (argStr != '') {
      ombdApi += "?t=" + argStr + "&y=&plot=short&apikey=40e9cece";
      request(ombdApi, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          const info = JSON.parse(body);
          const output = `-------------------------------\nThis movie's title is: ${info.Title}, which was released in ${info.Year}.\nIMDB scored ${info.Title} at ${info.imdbRating}, but Rotten Tomato's score was: ${info.Ratings[1].Value}.\n${info.Title} was made in this country or countries: ${info.Country}.\nYou can hear ${info.Title} in these languages: ${info.Language}.\nWanna know what ${info.Title} is about?\n${info.Plot}\nFinally, these are the actors: ${info.Actors}\n`;
          console.log(output);
          fs.appendFile("log.txt", output, function(err) {
            if (err) {
              return console.log(err);
            }
          });
        }
      });
    } else {
      argStr = "Mr. Nobody";
      ombdApi += "?t=" + argStr + "&y=&plot=short&apikey=40e9cece";
      request(ombdApi, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          const info = JSON.parse(body);
          const output = `Nothing entered, defaulting to...\n-------------------------------\nThis movie's title is: ${info.Title}, which was released in ${info.Year}.\nIMDB scored ${info.Title} at ${info.imdbRating}, but Rotten Tomato's score was: ${info.Ratings[1].Value}.\n${info.Title} was made in this country or countries: ${info.Country}.\nYou can hear ${info.Title} in these languages: ${info.Language}.\nWanna know what ${info.Title} is about?\n${info.Plot}\nFinally, these are the actors: ${info.Actors}\n`;
          console.log(output);
          fs.appendFile("log.txt", output, function(err) {
            if (err) {
              return console.log(err);
            }
          });
        }
      });
    }
  },
  //justDoIt is a function that reads a txt file, extrats the info, stores that info in variables and then executes checkArg()
  justDoIt: () => {
    fs.readFile("random.txt", "utf8", function(error, data) {
      if (error) {
        return console.log(error);
      }
      console.log(data);
      let dataArr = data.split(",");
      _2ndArg = dataArr[0];
      argStr = dataArr[1];
      app.checkArg();
    });
  },
  //checkArg determines what statement was entered by the user and runs the correct function
  checkArg: () => {
    switch(_2ndArg) {
      case 'my-tweets':
        return app.getTweets();
        break;
      case 'spotify-this-song':
        return app.getSpotify();
        break;
      case 'movie-this':
        return app.getMovie();
        break;
      case 'do-what-it-says':
        return app.justDoIt();
        break;
      default:
        console.log('Please enter either "my-tweets", "spotify-this-song", "movie-this", or "do-what-it-says"');
     }
  },
  //concatArg is a function that concatenates all arguments after the first argument and stores it in argStr
  concatArg: () => {
    for (let i = 3; i < nodeArg.length; i++) {
      if (i === nodeArg.length - 1) {
       argStr += nodeArg[i];
     } else {
       argStr += nodeArg[i] + " ";
     }
   }
  }
};
//
//----------------------------------------------------------------------------------------------------------------------------
//Invoking concatArg and checkArg to run the program
app.concatArg();
app.checkArg();
