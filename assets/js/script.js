// For the search functions --  https://www.omdbapi.com/?s=batman&page=1&apikey=9b8846d8

var searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var searchTerm = document.querySelector('#search-bar').value;
    searchMovies(searchTerm);
});


function searchMovies(searchTerm) {
    var apiUrl = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=9b8846d8`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
        if (data.Response === "True") {
            //searching for the first 10 movies
            var movies = data.Search.slice(0, 5);
  
            var movieList = document.querySelector('.movie-list');
            movieList.innerHTML = '';
            movies.forEach(movie => {
            var card = createMovieCard(movie);
            movieList.appendChild(card);
        });
        } else {
          console.log('No movies found.');
        }
    })
    .catch(error => {
    console.error('Error:', error);
    });
}


function createMovieCard(movie) {

    var card = document.createElement('div');
    card.classList.add('movie-card');

    var poster = document.createElement('img');
    poster.src = movie.Poster;
    poster.alt = movie.Title;
  
    var title = document.createElement('h3');
    title.classList.add('text-lg');
    title.textContent = movie.Title;
  
    var year = document.createElement('p');
    year.textContent = `${movie.Year}`;
  
    card.appendChild(title);
    card.appendChild(year);
    card.appendChild(poster);
  
    return card;
}