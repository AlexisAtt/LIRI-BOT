    var dotenv = require("dotenv").config();
    var keys = require("./keys.js");
    
    var Spotify = require("node-spotify-api");
    var spotify = new Spotify(keys.spotify);
    var axios = require("axios");
    
    var fs = require("fs");
    var moment = require("moment");
    var userCase = process.argv[2];
    var userInput = process.argv[3];

function userCommand(userCase, userInput) {
switch (userCase){
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
}
userCommand(userCase, userInput);

function concertThis() {
    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp")
    .then(function(response) {
            
            //console.log(response.data[0]);
            console.log("------Info------")
            console.log("Venue: " + response.data[0].venue.name);
            console.log("Location: " + response.data[0].venue.city + "," + response.data[0].venue.region);
            console.log("Date: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
            console.log("----------------")
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });

}

function movieThis(){
    axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(function(response){
        console.log("------Info------");
        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot summary: " + response.data.Plot);
        console.log("Cast: " + response.data.Actors);
        console.log("----------------");
    });
};


function spotifySong() {
    if (userInput === "") {
        spotify.search({ type: "track", query: "Africa"},
        function(error,data) {
            if (error) {
                return console.log(error);
            }
            for (var i=0; i<data.tracks.items.length; i++) {
                console.log("------Info------");
                console.log("Artist: " + data.tacks.items[i].album.artists[0].name);
                console.log("Song Prieview: " + data.tracks.items[i].preview_url);
                console.log("Album: " + data.tracks.items[i].album.name);
                console.log("----------------");
            }
        }
        );
    }
else{
    spotify.search({
        type: "track", query: userInput
    }, function(error, data){
        if(error) {
            return console.log(error);
        }
        for (var i=0; i<data.tracks.items.length; i++) {
            console.log("------Info------");
            console.log("Artist: " + data.tracks.items[i].album.artists[0].name);
            console.log("Song Prieview: " + data.tracks.items[i].preview_url);
            console.log("Album: " + data.tracks.items[i].album.name);
            console.log("----------------");

        }
    });
}
}

function doWhatItSays(){
    fs.readFile("random.txt", "utf8", (error, data) => {
        if (error) {
            console.log("err: ", error);
        }
        var array = data.split(",");
        if (array[0] === "concert-this") {
            concertThis(array[1]);
        }
        else if (array[0] === "spotify-this-song") {
            spotifyThis(array[1]);
        } else {
            movieThis(array[1]);
        }
    });
}


var text = userCase + " " + userInput + "\n";

fs.appendFile("random.txt", text, function(error){
    if (error) {
        console.log(error);
    }
    else{
        console.log("New Entry Added");
    }
});