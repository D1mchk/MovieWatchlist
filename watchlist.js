const main = document.getElementById('main-el');
const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];


if (watchlist.length === 0) {
    main.innerHTML = "<p class='container'>Nothing 😢</p>";
} else {
    main.innerHTML = '';

    watchlist.forEach(id => {
        fetch(`https://www.omdbapi.com/?apikey=9148effd&i=${id}`)
            .then(res => res.json())
            .then(data => {
                main.innerHTML += `
                    <section class='full-info'>
                        <img class="poster" src="${data.Poster}">
                        <div class="info">
                            <div class="row">
                                <h2>${data.Title}</h2>
                                <i class="fa-solid fa-star"></i>
                                <p class="rate">${data.imdbRating}</p>
                            </div>
                            <div class="row">
                                <p class="time">${data.Runtime}</p>
                                <p class="genre">${data.Genre}</p>
                                <button class="remove-btn row" data-id="${data.imdbID}">
                                    <i class="fa-solid fa-minus"></i>
                                    <p>Remove</p>
                                </button>
                            </div>                                       
                            <p class="plot">${data.Plot}</p>            
                        </div>
                    </section>
                `;
            });
    });
}


main.addEventListener('click', function (e) {
    const btn = e.target.closest('.remove-btn'); // ищем ближайшую кнопку
    if (btn) {
        const imdbID = btn.dataset.id;
        let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

        watchlist = watchlist.filter(id => id !== imdbID);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));

        btn.closest('.full-info').remove();

        if (watchlist.length === 0) {
            main.innerHTML = "<p class='container'>Nothing 😢</p>";
        }
    }
});
