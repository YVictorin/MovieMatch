const submitBtn = document.getElementById('submit-btn');

submitBtn.addEventListener('click', e => {
    const userInputVal = document.getElementById('user-input').value.trim();

    if(userInputVal !== '') {
        // Save user's input to the local storage
        localStorage.setItem("userMovieChoice", userInputVal);

        // Navigate to the movie page
        window.location.href = "/movies";
    } else {
        alert("You must enter a movie before you search.");
    }
});
