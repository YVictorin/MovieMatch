const request = require('postman-request');
require("dotenv").config();

const getSimilarMovies = (userMovieId, callback) => {
    let tmdbPosterUrl = "https://image.tmdb.org/t/p/w500";
    const url = `https://api.themoviedb.org/3/movie/${userMovieId}/similar?language=en-US&page=1&api_key=${process.env.API_KEY}`;
    // const url = 'https://pastebin.com/raw/9tFi2pzF';
    const options = {
        url,
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NWNjNTBlM2M5NzhhZWNlZGNjNjZmMmY3NmEyYzEwOCIsIm5iZiI6MTczNDU0NDc5My4wNDQ5OTk4LCJzdWIiOiI2NzYzMGQ5OWNjMmI2ZDlmY2NhYjBiMzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.HxElS_1roP9HmIXvrmj-gye45jrwPGq9lnpwLrUqB3c'
        },
        json: true
    };

    request(options, (error, response) => {
        if(error) {
            callback('Cannot find movie', undefined)
        } else if (response.body.success === false) {
            callback('The action you requested could not be completed', undefined)
        } else {
            callback(undefined, {
                titleArr: response.body.results.map((movie) => movie.title),
                imgElems: response.body.results.map((movie) => `<img src="${tmdbPosterUrl + movie.poster_path}" alt="a movie poster">`)
            })
        }
    })
}

module.exports = getSimilarMovies;

