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
    card.classList.add('movie-card', 'w-1/5', 'bg-[#27374D]', 'text-[#9DB2BF]', 'p-4', 'box-border', 'border', 'border-black', 'rounded-md', 'text-center', 'relative', 'mr-2');

    var poster = document.createElement('img');
    poster.classList.add('mx-auto', 'relative', 'w-full', 'h-auto');
    poster.src = movie.Poster;
    poster.alt = movie.Title;
  
    var title = document.createElement('h3');
    title.classList.add('text-lg');
    title.textContent = movie.Title;
  
    var year = document.createElement('p');
    year.classList.add('mb-3');
    year.textContent = `${movie.Year}`;

    var addButton = document.createElement('button');
    addButton.textContent = 'Add to List';
    addButton.classList.add('btn-add', 'px-2', 'py-2', 'bg-[#9DB2BF]', 'rounded-md', 'hover:bg-[#DDE6ED]', 'box-border', 'border', 'border-black', 'bottom-2', 'left-1/2', 'transform', '-translate-x-1/2', 'translate-y-1/2', 'relative', 'bottom-0', 'w-full');
    addButton.style.color = '#27374D';

    addButton.addEventListener('click', function () {
        addMovieToList(movie.Title);
    });
  
    card.appendChild(title);
    card.appendChild(year);
    card.appendChild(poster);
    card.appendChild(addButton);
  
    return card;
}

function addMovieToList(title) {
    var selectedList = document.querySelector('.selected-list');
    var movieTitles = selectedList.querySelectorAll('li');

    var isMovieAlreadyAdded = Array.from(movieTitles).some(function (movie) {
        return movie.textContent === title;
    });
    
    if (isMovieAlreadyAdded) {
        console.log('Movie is already added to the list.');
        return;
    }
    var listItem = document.createElement('li');
    listItem.textContent = title;
    listItem.classList.add('hover:bg-[#DDE6ED]', 'hover:cursor-pointer')
    listItem.style.color = '#27374D';
    
    selectedList.appendChild(listItem);
  }