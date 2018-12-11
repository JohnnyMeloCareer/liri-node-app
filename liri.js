// Using require, allows us to import modules from another location.
require("dotenv").config();

// A variable that "require" axios to make the API calls
var axios = require("axios");

// A variable to require keys.js to get the spotify API key <-- Might have to revist this line later for bugging purposes
var keys = require("./keys.js");

// A variable to hold the node-spotify-API npm to more easily get to spotify data <-- Might have to revist this line later for bugging purposes
var Spotify = require("node-spotify-api");

// A variable to require the moment npm package to parse dates
var moment = require("node-spotify-api");

// A variable that holds the spotify keys that's located on the .env file
var spotify = new Spotify(keys.spotify);

// Empty global variable that is going to hold the date
var date;

// A variable to hold the user input at the index[2] of process.argv (movie this || spotify this || concert this)
var phrase = process.argv[2];

// A variable to hold an empty array that will take in the user input after index[2] of process.argv
var input = [];

// A variable to require the fs npm package
var fs = require("fs");

// A for loop to push the user input after index[2] of process.argv into the input array
for (i = 3; i < process.argv.length; i++) {
    input.push(process.argv[i])
};

// A variable to hold the search function that searches spotify. Also, takes the users' input, joins it and puts it into the spotify search
var music = function() {spotify.search({ type: "track", query: input.join(" "), limit: 1 }, function (err, dara) {

// Make a if condition to log any error, and tell what the error is.
if (err) {
    return console.log("error occured " + err);
}

// Log the information that is returned from the spotify search to the console
console.log("\nArtist(s): " + data.tracks.items[0].album.artists[0].name);
console.log("\nAlbum: " + data.tracks.items[0].album.name);
console.log("\nTitle: " + data.tracks.items[0].name);
console.log("\nPreview Clip: " + data.tracks.items[0].preview_url + "\n");

// Append log.text with the same information
fs.appendFile("log.txt", data.track.items[0].album.artists[0].name + data.tracks.items[0].album.name + data.tracks.items[0].name + data.tracks.items[0].preview_url, function(err) {
if (err) {
    console.log(err);
}
else {


       }
    });
});
}

// A variable to hold the movies function
var movies = function() {

// If cond("ition for the user doesn't input a title 
if (process.argv.length === 3) {

// Axios to search to omdb API and return the information Titanic <--- get method
axios.get("http://www.omdbapi.com/?t=Titanic&y=&plot=short&apikey=trilogy").then(
    function (response) {
        var movieData1 = response.data;

// Print Titanic info to the console
console.log("\nTitle: " + movieData1.Title);
                console.log("\nYear: " + movieData1.Year);
                console.log("\nRating(IMDB): " + movieData1.imdbRating);
                console.log("\nRating(RottenTomatoes): " + movieData1.Ratings[1].Value);
                console.log("\n Country: " + movieData1.Country);
                console.log("\n Language: " + movieData1.Language);
                console.log("\n Plot: " + movieData1.Plot);
                console.log("\n Actors: " + movieData1.Actors + "\n");
            })

    }

// Else, didn't put in a title
else {

// Axios to search to omdb API using the user input in the search query
axios.get("http://www.omdbapi.com/?t=" + input.join(" ") + "&y=&plot=short&apikey=trilogy").then(
    function (response) {

// Create a response.data variable to get into movie response
var movieData = response.data

// Print the information we want from the users desired title to the console
console.log("\nTitle: " + movieData.Title);
console.log("\nYear: " + movieData.Year);
console.log("\nRating(IMDB): " + movieData.Ratings[1].Value);
console.log("\n Country: " + movieData.Country);
console.log("\n Language: " + movieData.Language);
console.log("]n Plot: " + movieData.Plot);
console.log("\n Actors: " + movieData.Actors + "\n");

// Append the information to the log.txt file
fs.appendFile("log.txt", movieData.Title + movieData.Year + movieData.imdbRating + movieData.Ratings[1].Value + movieData.Country + movieData.Language + movieData.Plot + movieData.Actors, function(err) {
if (err) {
    console.log(err);
}
else {


}
});

    });
}
}

// If "phrase" (process.argv[2]) is do-what-it-says, then run a function
if (phrase === "do-what-it-says") {

// Read the random.txt file to get the information
fs.readFile("random.txt","utf8", function(error, data) {
    if (error) {
        return console.log(error);

    }

// Empty out the process.argv array
// Process.argv = [];

// A variable to hold the data split into a string seperated by a coma
var dataArr = data.split(".")

// Set the phrase variable to get the dataArr information at the index of [0]
phrase = dataArr[0];

// Push the information at dataArr[1] (name of song/movie) to the input array
input.push(dataArr[1]);

// If random.txt points to a song
if (phrase === "spotify-this-song") {
    music();
}

// If random.txt points to a concert
if (phrase === "concert-this") {
    concert();
}

// If random.txt points to a movie 
if (phrase === "movie-this") {
    movies();
}
    });

}

// If the user input at process.argv[2] is searching for a song (spotify-this-song)
if (phrase === "spotify-this-song") {
// Call the search function
music();
}

// If the user input at process.argv[2] is searching for a concert information (concert-this)
if (phrase === "concert-this") {
// Call the concert function
concert();
}

// If the user input at process.argv[2] is searching for a movie (movie-this)
if (phrase === "movie-this") {
// Call the movie Function
movies();
}

// Then run a request with axios to the OMDB API / Bands In Town API 

// Steps:



