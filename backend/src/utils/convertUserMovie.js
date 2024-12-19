const request = require('postman-request');

const convertToId = (userMovieName, callback) => {
    let url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(userMovieName)}&api_key=${process.env.API_KEY}`;

    const options = {
        url,
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NWNjNTBlM2M5NzhhZWNlZGNjNjZmMmY3NmEyYzEwOCIsIm5iZiI6MTczNDU0NDc5My4wNDQ5OTk4LCJzdWIiOiI2NzYzMGQ5OWNjMmI2ZDlmY2NhYjBiMzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.HxElS_1roP9HmIXvrmj-gye45jrwPGq9lnpwLrUqB3c'

         },
        json: true,
    };

    request(options, (error, response) => {
        if(error) {
            callback("Failed to convert movie ID", undefined)
        } else if (response.body.total_results === 0) {
            callback("Could not find movie's name", undefined)
        } else {
            callback(undefined, {
                id: response.body.results[0].id,
            })
        }
    })


}

module.exports = convertToId;