const cards = document.querySelectorAll(".movie-card");

const displaySimilarMovies = async () => {
    const userMovie = localStorage.getItem("userMovieChoice");

    if (!userMovie) {
        console.warn("userMovie not found in localStorage");
        return '';
    }

    try {
            const response = await fetch(`/movies/json?userMovie=${encodeURIComponent(userMovie)}`, {
            method: "GET",
            headers: { Accept: "application/json" },
        });

        const dataJson = await response.json();

        // Populate cards with the similar movies titles and images
        const cardsArr = [...document.querySelectorAll('.movie-card')];
        const cardImgArr = [...document.querySelectorAll('.movie-img')];

        // There can only be as many movie titles appended as there is html cards now
        dataJson.similarMovies.forEach((title, index) => {
            if (index < cardsArr.length) {
                let movieTitle = document.createElement("span");

                // Truncate title if it exceeds 5 characters
                if (title.length > 10) {
                    movieTitle.textContent = title.substring(0, 10) + '...';
                } else {
                    movieTitle.textContent = title;
                }

                cardsArr[index].appendChild(movieTitle);
            }
        });

        dataJson.imgElems.forEach((img, index) => {
            if (index < cardImgArr.length) {
                const parsedDoc = new DOMParser().parseFromString(dataJson.imgElems[index], "text/html"); //converts the string from the json data into an actual HTML e
                const imgElement = parsedDoc.body.firstChild; // This will give you the <img> element

                // Add multiple classes separately
                imgElement.classList.add('img-fluid', 'w-100', 'h-50', 'border-none');

                cardImgArr[index].appendChild(imgElement);
            }
        })

    } catch (e) {
        console.error(e);
    }
}


document.addEventListener("DOMContentLoaded", displaySimilarMovies);

