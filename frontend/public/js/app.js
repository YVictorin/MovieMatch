// Import the Bootstrap bundle

// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {data} from "autoprefixer";

console.log('app.js loaded');

const input = document.getElementById("user-input");
const submitBtn = document.getElementById("submit-btn");

//creates the cards with the proper info only after the user enters said info, styled using bootstrap classes

const getUserMovie = async () => {
    try {
        const response = await fetch(`/movies/json?userMovie=${input.value.trim()}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        const dataJson = await response.json();


    } catch (e) {
        console.error(e);
    }
}

    if(input) {
        submitBtn.addEventListener("click", (e) => {
            e.preventDefault();
            getUserMovie();
        });
}
