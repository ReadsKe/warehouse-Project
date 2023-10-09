document.addEventListener("DOMContentLoaded", function () {
    // Load movie details and menu on page load
    document.getElementById("loadMovieButton").addEventListener("click", function () {
        // Fetch the list of movies
        fetchMovieMenu();

    });





// Function to fetch movie details
function fetchMovieDetails(id) {
    fetch(`http://localhost:3000/films/${id}`)
    .then((response) => response.json())
    .then((data) => {
        // Update the movie details
        document.getElementById("moviePoster").src = data.poster;
        document.getElementById("movieTitle").textContent = data.title;
        document.getElementById("movieRuntime").textContent = `Runtime: ${data.runtime} mins`;
        document.getElementById("movieShowtime").textContent = `Showtime: ${data.showtime}`;
        document.getElementById(`capacity`).textContent = `Capacity: ${data.capacity}`;
        document.getElementById(`tickets_sold`).textContent = `Tickets Sold: ${data.tickets_sold}`;
        // Show the "Buy Ticket" button after loading movie details
        document.getElementById("buyTicketButton").style.display = "block";

        const availableTickets = data.capacity - data.tickets_sold;
        document.getElementById("availableTickets").textContent = `Available Tickets: ${availableTickets}`;
        console.log(data);

    });

// Buy Ticket button click event
    document.getElementById("buyTicketButton").addEventListener("click", function () {
     const availableTickets = parseInt(document.getElementById("availableTickets").textContent.split(":")[1].replace());
     if (availableTickets > 0) {
        // Decrease available tickets by 1 each time a purchase  is made
        const updatedAvailableTickets = availableTickets - 1;
        document.getElementById("availableTickets").textContent = `Available Tickets: ${updatedAvailableTickets}`;
        // Disables the buy button if shows are sold out
        if (updatedAvailableTickets === 0) {
            document.getElementById("buyTicketButton").disabled = true;
        }
        } else {
        alert("Sold out, Try our other shows");
        }

    // Update "Buy Ticket" to match other shows availability
    const buyTicketButton = document.getElementById("buyTicketButton");
    buyTicketButton.disabled = false;
    
    });

}

function fetchMovieMenu() {
    fetch("http://localhost:3000/films")
        .then((response) => response.json())
        .then((movies) => {
            const filmsList = document.getElementById("films");
            if (filmsList) {
                filmsList.innerHTML = ''; // Clear existing list

                movies.forEach((movie) => {
                    const listItem = document.createElement("li");
                    listItem.classList.add("film");
                    listItem.textContent = movie.title;
                    listItem.setAttribute("data-movie-id", movie.id); // Set the movie ID as a data attribute

                    // Add an onclick function to display movie details when clicked
                    listItem.onclick = function (event) {
                        event.preventDefault();
                        fetchMovieDetails(movie.id); // Fetch details for the clicked movie
                    };

                    filmsList.appendChild(listItem);
                });
            }
        });
}
});
