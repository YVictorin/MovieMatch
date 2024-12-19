// Import the Bootstrap bundle
//
// This includes Popper and all of Bootstrap's JS plugins.

// import "bootstrap/dist/js/bootstrap.bundle.min.js";

const input = document.getElementById("user-input");
const submitBtn = document.getElementById("submit-btn");

const getUserMovie = async () => {
    try {
        const response = await fetch(`/movies?userMovie=${input.value.trim()}`);
        const dataJson = await response.json();
        console.log(dataJson);
    } catch (e) {
        console.error(e);
    }
}

    if(input) {
        submitBtn.addEventListener("click", (e) => {
            getUserMovie();
        });
}
