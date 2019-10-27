    var dotenv = require("dotenv").config();
    var keys = require("./keys.js");
   // var spotify = new Spotify(keys.spotify);
    var axios = require("axios");
    
    var fs = require("fs");
    var moment = require("moment");

 


switch (process.argv[2]){
    case "concert-this":
        concertThis();
        break;

    case "spotify-this-song":
        spotifySong();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says": 
         doWhatItSays();
         break;
}

function concertThis() {

    var artist = process.argv[3];

    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios
    .get(queryUrl)
    .then(function(response) {
            console.log("" +response.data.Year)
        })
        .catch(function(error){
            if (error.response) {
                console.log("----Data-----");
                console.log(error.response.data);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });

}
