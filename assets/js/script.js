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
                movieList.classList.add('flex')
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
    card.classList.add('movie-card', 'w-1/5', 'bg-[#27374D]', 'text-[#9DB2BF]', 'p-4', 'box-border', 'border', 'border-black', 'rounded-md', 'text-center', 'relative', 'mr-1', 'mb-3', 'flex', 'flex-col');

    var title = document.createElement('h3');
    title.classList.add('text-lg');
    title.textContent = movie.Title;

    var year = document.createElement('p');
    year.classList.add('mb-3');
    year.textContent = `${movie.Year}`;

    var poster = document.createElement('img');
    poster.classList.add('relative', 'w-full', 'h-auto', 'items-center');
    poster.src = movie.Poster;
    poster.alt = movie.Title;

    var addButton = document.createElement('button');
    addButton.textContent = 'Add to List';
    addButton.classList.add('btn-add', 'px-2', 'py-2', 'bg-[#9DB2BF]', 'rounded-md', 'hover:bg-[#DDE6ED]', 'box-border', 'border', 'border-black', 'bottom-2', 'left-1/2', 'transform', '-translate-x-1/2', 'translate-y-1/2', 'relative', 'bottom-0', 'w-full');
    addButton.style.color = '#27374D';

    addButton.addEventListener('click', function () {
        addMovieToList(movie.Title, movie.Year);
    });

    card.appendChild(title);
    card.appendChild(year);
    card.appendChild(poster);
    card.appendChild(addButton);

    return card;
}

function addMovieToList(title, year) {
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
    listItem.classList.add('flex', 'items-center', 'justify-between', 'bg-[#9DB2BF]', 'hover:bg-[#DDE6ED]', 'hover:cursor-pointer', 'mt-1', 'border', 'border-black', 'rounded-lg')
    listItem.style.color = '#27374D';

    var movieInfo = document.createElement('div');
    movieInfo.classList.add('flex', 'items-center', 'w-full');

    var yearElement = document.createElement('span');
    yearElement.textContent = year;
    yearElement.classList.add('ml-auto');

    movieInfo.appendChild(yearElement);

    listItem.appendChild(movieInfo);

    var removeButton = document.createElement('xButton');
    removeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>`;

    removeButton.classList.add('text-[#27374D]');

    removeButton.addEventListener('click', function () {
        listItem.remove();
    });

    listItem.addEventListener('click', function (){
        window.location.href = 'sindex.html';
    });

    listItem.appendChild(removeButton);

    selectedList.appendChild(listItem);

}
//new york times api for reviews on next page

var urlParams = new URLSearchParams(window.location.search);
var movieID = urlParams.get('id');
var cardElement = document.querySelector('.card');

fetch('https://api.nytimes.com/svc/movies/v2/reviews/all.json?api-key=plnHoeZOcwLFaJBwAuUoAd7wHUCKGLA2')
    .then(response => response.json())
    .then(data => {
        var reviews = data.results;

    var selectedReview = reviews.find(review => review.display_title === movieID);

    if (selectedReview) {
      // movie info
      var card = document.createElement('div');
      card.classList.add('card-item');

      var title = document.createElement('h2');
      title.textContent = selectedReview.display_title;
      card.appendChild(title);

      var summary = document.createElement('p');
      summary.textContent = selectedReview.summary_short;
      card.appendChild(summary);

      var poster = document.createElement('img');
      poster.src = selectedReview.multimedia.src;
      poster.alt = selectedReview.display_title;
      card.appendChild(poster);

      cardElement.appendChild(card);
    } else {
      console.log('Review not found.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });