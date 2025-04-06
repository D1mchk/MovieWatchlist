const searchBtn = document.querySelector('#search-btn');

const inputValue = document.querySelector('#search-input');

searchBtn.addEventListener('click', renderMovies);
const main = document.getElementById('main-el')

function renderMovies() {
    const searchTerm = inputValue.value;
    fetch(`http://www.omdbapi.com/?apikey=9148effd&s=${searchTerm}`)
        .then(res => res.json())
        .then(data => {
            if (data.Response === "True") {
                main.innerHTML=''
                data.Search.forEach(film => {
                    fetch(`http://www.omdbapi.com/?apikey=9148effd&i=${film.imdbID}`)
                        .then(res => res.json())
                        .then(data => {
                            main.innerHTML += `
                                    <section class='full-info'>
                                        <img class="poster" src=${data.Poster}>
                                        <div class="info">
                                            <div class="row">
                                                <h2>${data.Title}</h2>
                                                <i class="fa-solid fa-star"></i>
                                                <p class="rate">${data.imdbRating}</p>
                                            </div>
                                            <div class="row">
                                                <p class="time">${data.Runtime}</p>
                                                <p class="genre">${data.Genre}</p>
                                                <button class='watch-list-btn row' data-id="${data.imdbID}">
                                                    <i class="fa-solid fa-plus"></i>
                                                    <p>Watchlist</p>
                                                </button>
                                            </div>                                       
                                            <p class="plot">${data.Plot}</p>
                                        </div>
                    
                                    </section>
                                    `;
                            console.log(data)
                        })
                })
            } else {main.innerHTML = `<p class="container">Unable to find what you’re looking for. Please try another search.</p>`}

        })
}

main.addEventListener('click', function (e) {
    const btn = e.target.closest('.watch-list-btn');

    if (btn) {
        const imdbID = btn.dataset.id;
        addMovie(imdbID);
    }
});

function addMovie(imdbID) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    if (!watchlist.includes(imdbID)) {
        watchlist.push(imdbID);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }
}

