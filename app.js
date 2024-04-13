//const API_KEY = "c8a01cf6-02f7-4cc2-a8b5-ffbbb7e64073";  //for dianulyaa459
const API_KEY = "709c9031-e36f-4508-9ecb-b7158876dd73" //for diana.kuanyshkyzy
const API_TOP = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1"
const API_TOP1 = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=2"
const API_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword="
const API_THRILLER = "https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=1&order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=1"
const API_DRAMA = "https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=2&order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=1"
const API_CRIMINAL = "https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=3&order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=1"
const API_MELODRAMA = "https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=4&order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=1"
const API_DETECTIVE = "https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=5&order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=1"
const API_FANTASY = "https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=6&order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=1"
const API_CHILD = "https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=7&order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=1"
const API_BIOGRAPHY = "https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=8&order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=1"
const API_NEWEST = "https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=10&order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=2023&yearTo=3000&page=1"
const API_MODAL = "https://kinopoiskapiunofficial.tech/api/v2.2/films/"
getMovies(API_TOP);
getMovies(API_TOP1);
 
async function getMovies(url){
    const resp = await fetch(url, {
        headers:{
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    }); 
    const response = await resp.json(); 
    ShowMovies(response);
}
function ShowMovies(data){
    const moviesshow = document.querySelector(".movies");
    data.items.forEach(movie => {
        const movieshow = document.createElement("div"); 
        movieshow.classList.add("movie"); 
        movieshow.innerHTML = 
        `<div class="movie_cover1">
        <img src="${movie.posterUrl}" class = "movie_cover" alt = "${movie.nameRu}">
        <div class="movie_cover--hover"></div>
    </div>
    <div class="movie_information">
        <div class="movie_title">${movie.nameRu}</div>
        <div class="movie_genre">${movie.genres.map((genre) =>` ${genre.genre}`)}</div>
        <div class="movie_rating movie_rating--${getColor(movie.ratingKinopoisk)}">${movie.ratingKinopoisk}</div>
        <div class="movie_year">${movie.year}</div>
    </div>`; 
    movieshow.addEventListener("click", ()=>openModal(movie.kinopoiskId))
    moviesshow.appendChild(movieshow); 
    }); 
}

function getColor(rating){
    if(rating>=8) {return "green";}
    else if(rating>=5) {return "orange";}
    else{return "red";}
}


async function getMoviessearch(url){
    const resp = await fetch(url, {
        headers:{
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    }); 
    if (!resp.ok) {
        throw new Error('Network response was not ok');
    }

    const response = await resp.json(); 
    ShowMoviessearch(response);
}

function ShowMoviessearch(data){
    const moviesshow = document.querySelector(".movies");
    document.querySelector(".movies").innerHTML = ""; 
    data.films.forEach(movie => {
        const movieshow = document.createElement("div"); 
        movieshow.classList.add("movie"); 
        movieshow.innerHTML = 
        `<div class="movie_cover1">
        <img src="${movie.posterUrl}" class = "movie_cover" alt = "${movie.nameRu}">
        <div class="movie_cover--hover"></div>
    </div>
    <div class="movie_information">
        <div class="movie_title">${movie.nameRu}</div>
        <div class="movie_genre">${movie.genres.map((genre) =>` ${genre.genre}`)}</div>
        <div class="movie_rating movie_rating--${getColor(movie.rating)}">${movie.rating}</div>
        <div class="movie_year">${movie.year}</div>
    </div>`; 
    movieshow.addEventListener("click", ()=>openModal(movie.filmId))
    moviesshow.appendChild(movieshow); 
    }); 
}


const form = document.querySelector("form");
const search = document.querySelector(".header_search");

if(form){
form.addEventListener("submit", (e)=>{
    e.preventDefault(); 
    const searchapi = `${API_SEARCH}${search.value}`
    if(search.value){
        getMoviessearch(searchapi);
        search.value = "";  
    }
});
}

const drama = document.querySelector('#dramaMoviesBtn')
if(drama){
drama.addEventListener('click', function (event) {
    document.querySelector(".movies").innerHTML = "";
    document.querySelector('.button1').innerText = 'Драма';
    getMovies(API_DRAMA);
})}



const thriller = document.querySelector('#thrillerMoviesBtn')
if(thriller){
thriller.addEventListener('click', function (event) {
    document.querySelector(".movies").innerHTML = "";
    document.querySelector('.button1').innerText = 'Триллер';
    getMovies(API_THRILLER);
})}


const melodrama = document.querySelector('#melodramaMoviesBtn')
if(melodrama){
    melodrama.addEventListener('click', function (event) {
    document.querySelector(".movies").innerHTML = "";
    document.querySelector('.button1').innerText = 'Мелодрама';
    getMovies(API_MELODRAMA);
})}

const fantasy = document.querySelector('#fantasyMoviesBtn')
if(fantasy){
    fantasy.addEventListener('click', function (event) {
    document.querySelector(".movies").innerHTML = "";
    document.querySelector('.button1').innerText = 'Фантастика';
    getMovies(API_FANTASY);
})}


const child = document.querySelector('#childMoviesBtn')
if(child){
    child.addEventListener('click', function (event) {
    document.querySelector(".movies").innerHTML = "";
    document.querySelector('.button1').innerText = 'Детские';
    getMovies(API_CHILD);
})}


const biography = document.querySelector('#biographyMoviesBtn')
if(biography){
    biography.addEventListener('click', function (event) {
    document.querySelector(".movies").innerHTML = "";
    document.querySelector('.button1').innerText = 'Биография';
    getMovies(API_BIOGRAPHY);
})}

const newest = document.querySelector('#newMoviesBtn')
if(newest){
    newest.addEventListener('click', function (event) {
    document.querySelector(".movies").innerHTML = "";
    document.querySelector('.button1').innerText = 'Новинки';
    getMovies(API_NEWEST);
})}

const topmovies = document.querySelector('#topMoviesBtn')
if(topmovies){
    topmovies.addEventListener('click', function (event) {
    document.querySelector(".movies").innerHTML = "";
    document.querySelector('.button1').innerText = 'Лучшие фильмы';
    getMovies(API_TOP);
})}


const criminal = document.querySelector('#criminalMoviesBtn')
if(criminal){
    criminal.addEventListener('click', function (event) {
    document.querySelector(".movies").innerHTML = "";
    document.querySelector('.button1').innerText = 'Криминал';
    getMovies(API_CRIMINAL);
})}

const detective = document.querySelector('#detectiveMoviesBtn')
if(detective){
    detective.addEventListener('click', function (event) {
    document.querySelector(".movies").innerHTML = "";
    document.querySelector('.button1').innerText = 'Детектив';
    getMovies(API_DETECTIVE);
})}


const modalelement = document.querySelector(".modal"); 
async function openModal(id){
    const resp = await fetch(API_MODAL + id, {
        headers:{
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    }); 
    const response = await resp.json(); 
    modalelement.classList.add("modal--show");
    document.body.classList.add("stop_scrolling");
    modalelement.innerHTML = `
    <div class = "modal_card">
        <img class = "modal_image" src="${response.posterUrl}" alt="${response.nameRu}">
        <h2>
            <span class="modal_title">${response.nameRu} - </span>
            <span class="modal_year">${response.year}</span>
        </h2>
        <ul class="modal_info">
            <li class = "modal_genre">Жанры: ${response.genres.map((genre) =>` ${genre.genre}`)}</li>
            <li class = "modal_country">Страны: ${response.countries.map((country) =>` ${country.country}`)}</li>
            <li class = "modal_description">Описание: ${response.description}</li>       
            <li class = "modal_duration">Продолжительность фильма: ${response.filmLength} мин.</li>     
        </ul>
        <button type = "button" class = "modal_button_close">Закрыть</button>  
    </div>  
    `
    const buttonclose = document.querySelector(".modal_button_close");
    buttonclose.addEventListener("click", () => modal_close());
}

function modal_close(){
    modalelement.classList.remove("modal--show"); 
    document.body.classList.remove("stop_scrolling"); 
}
window.addEventListener("click", (e)=>{
    if(e.target===modalelement){
        modal_close();
    }
})
window.addEventListener("keydown", (e)=>{
    if(e.keyCode===27){
        modal_close(); 
    }
})
