const API_key = 'ef66f227b3832fafdcb20e1f78c4ebcd'
let barra = document.querySelector('.barra-busqueda')
let input_info = document.querySelector('.input-info')
let movie_list = document.querySelector('.movie_container')
let movie_popular = document.querySelector('.movie_popular_container')
let scroll_derecha = document.querySelector('.scroll_derecha')
let scroll_izquierda = document.querySelector('.scroll_izquierda')
let scroll_derecha_popular = document.querySelector('.scroll_derecha_popular')
let scroll_izquierda_popular = document.querySelector('.scroll_izquierda_popular')
let generos = document.querySelector('.container_generos')
let categories_nav = document.querySelector('.dropdown-content-3')
let categoria_seccion = document.querySelector('.categoty_main_coontainer')
let peliculas_categoria = document.querySelector('.genro_de_categoria')
let pelis_container = document.querySelector('.genero_container')
let titulo_de_las_categorias = document.querySelector('.titulo_generos')
let input_movies = document.querySelector('.input-info')
let container_search_movies = document.querySelector('.genero_container_search')
let fondo_movie_details = document.querySelector('.card_movie_details')
let pelis_recomendadas = document.querySelector('.pelis_recomendadas')

let scroll_position = 0
let scroll_position_popular = 0


function toggleBusqueda() {    
    let estado = barra.style.display
    if(estado === 'none' || estado === '') {
        barra.style.display = 'block'
    } else {
        barra.style.display = 'none'
        input_info.value = ''
    }
}

scroll_derecha.addEventListener('click', () => {
    scroll_position +=850
    scroll_movies()
})

scroll_izquierda.addEventListener('click', () => {
    scroll_position -=850
    scroll_movies()
})

scroll_derecha_popular.addEventListener('click', () => {
    scroll_position_popular +=950
    scroll_movies_popular ()
})

scroll_izquierda_popular.addEventListener('click', () => {
    scroll_position_popular -=950
    scroll_movies_popular ()
})



function scroll_movies () {
    const maxScroll = (movie_list.scrollWidth - movie_list.clientWidth);
    scroll_position = Math.min(maxScroll, Math.max(0, scroll_position));
    movie_list.style.transform = `translateX(-${scroll_position}px)`;
}

function scroll_movies_popular () {
    const maxScroll = (movie_popular.scrollWidth - movie_popular.clientWidth);
    scroll_position_popular = Math.min(maxScroll, Math.max(0, scroll_position_popular));
    movie_popular.style.transform = `translateX(-${scroll_position_popular}px)`;
}

async function get_trending_movies() {
    const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_key}`)
    const data = await res.json()
    const movies = data.results
    console.log(movies)
    let draw = movies.map(item => 
        `<div class="card_of_the_movie" onclick="get_movie_details(${item.id})">
              <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${item.title}">
        </div>`
        ).join('')

        movie_list.innerHTML = draw
}


async function get_genres_movies(){
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_key}`)
    const data = await res.json()
    const categories = data.genres
    const info = categories.map(category => 
        `<li><a id="${category.id}" onclick="location.hash='#category=${category.id}-${category.name}'">${category.name}</a></li>`
        ).join('')
    categories_nav.innerHTML = info

    const gen = categories.map(cat =>
        `
        <div id="${cat.id}"class="card_genros" onclick="location.hash='#category=${cat.id}-${cat.name}'">
            <p>${cat.name}</p>
        </div>
        `
        ).join('')

    generos.innerHTML = gen
}

async function get_pupular_movies() {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_key}`)
    const data = await res.json()
    const pelis = data.results
    const info = pelis.map(peli => 
        `
        <div class="all_card_info" onclick="get_movie_details(${peli.id})" >
            <div class="card_of_the_movie_pupular">
                <img src="https://image.tmdb.org/t/p/w500${peli.poster_path}" alt="">
            </div>
            <div class="container_info_movie">
                <h3>TITLE: ${peli.original_title}</h3>
                <p>${peli.overview}</p>
            </div>
        </div>
        `).join('')
    
    movie_popular.innerHTML = info
}

async function get_movies_by_category(id, titulo) {
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${id}&api_key=${API_key}`)
    const data = await res.json()
    const movies = data.results
    console.log(movies)
    categoria_seccion.style.display = 'none'
    titulo_de_las_categorias.innerHTML = titulo
    const draw = movies.map(peli => 
        `
        <div class="card_genero_cotainer" onclick="get_movie_details(${peli.id})">
            <img src="https://image.tmdb.org/t/p/w500${peli.poster_path}" alt="${peli.overview}">
        </div>
        `
        ).join('')

    pelis_container.innerHTML = draw
    peliculas_categoria.style.display = 'block'
}


async function get_movies_by_search(param) {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${param}&api_key=${API_key}`)
    const data = await res.json()
    const movies = data.results
    const draw = movies.map(movie => 
        `
        <div class="card_genero_cotainer" onclick="get_movie_details(${movie.id})">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.overview}">
        </div>
        
        `
        ).join('')

        container_search_movies.innerHTML = draw
}


function get_movie_details(id) {
    location.hash = `#movie=${id}`
}

async function get_movie_details_by_id(id) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_key}`)
    const data = await res.json()
    console.log(data)
    let generos = data.genres
    let categories = generos.map(genero => 
        `<li>${genero.name}</li>`
    ).join('')

    console.log(categories)
    fondo_movie_details.style.backgroundImage = `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url(https://image.tmdb.org/t/p/w500${data.poster_path})`
    let draw = `
        <h3 class="titulo_peli">${data.original_title}</h3>
        <p class="parrafo_peli">${data.overview}</p>
        <p class="parrafo_peli_relase">RELEASE DATE: ${data.release_date}</p>
        <ul class="categoias_pelicula">${categories}</ul>
    `

    fondo_movie_details.innerHTML = draw
    get_related_movies(id)
}

async function get_related_movies(id) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_key}`)
    const data = await res.json()
    const relacionadas = data.results
    console.log(relacionadas)

    const draw = relacionadas.map(peli => {
        return `
        <div class="card_genero_cotainer" onclick="get_movie_details(${peli.id})">
            <img src="https://image.tmdb.org/t/p/w500${peli.poster_path}" alt="${peli.overview}">
        </div>
        `
      }).join('')

    pelis_recomendadas.innerHTML = draw

}













