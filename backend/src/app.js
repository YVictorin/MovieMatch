const path = require("path");
const express = require("express");
const hbs = require("hbs");
const convertMovieName = require("./utils/convertUserMovie");
const findSimilarMovie = require("./utils/similarMovies");

require("dotenv").config();


const PORT = process.env.PORT || 3001;

const app = express();

//a static directory where we can put all the assets that will make our website
const publicDirectoryPath = path.join(__dirname, "../../frontend/public");     //must be an absolute path we can do that by using __dirname
const viewsPath = path.join(__dirname, "../../frontend/templates/views");      //express expects views/handlebars templates to live in a folder called views so we changed that here
const partialsPath = path.join(__dirname, "../../frontend/templates/partials");


app.set('view engine', 'hbs');  //sets up the handlebars wrapper/hbs for dynamic templating i.e. dynamic html pages
app.set('views', viewsPath);   //points express to our renamed templates directory
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    //res will send rendered hbs back to the requester/browser
    res.render("index");
})


//localhost:3000/similar
app.get("/movies", (req, res) => {
    const userMovieName = req.query.userMovie;

    convertMovieName(userMovieName, (error, data) => {
        if (error) {
            return res.send({
                error,
            })
        }

        const movieId = data.id;

        findSimilarMovie(movieId, (error, data) => {
            if (error) {
                return res.render("movies",{
                    userMovieName,
                    error,
                    similarMovies: [],
                    allImgPosters: "",
                })
            }

            //sending multiple html img tags of the movie's poster image
            const allImgPosters = data.imgSrcArr
                .map(src => `<img src="${src}" alt="Movie Poster">`)
                .join("");


             res.render('movies',{
                userMovieName,
                similarMovies: data.titleArr,
                allImgPosters,
            })
        })
    })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});