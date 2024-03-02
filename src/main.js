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
let loader = document.querySelector('.loader')
let content = document.querySelector('.main_container')
let img_movie = document.querySelector('.image_movie')
let cargar_mas = document.querySelector('.cargar_mas')
let liked_container = document.querySelector('.movies_liked_conainer')
let liked_scroll_derecha = document.querySelector('.scroll_derecha_liked')
let liked_scroll_izquierda = document.querySelector('.scroll_izquierda_liked')
let button_favoritos = document.querySelector('.button_favorite')

let scroll_position = 0
let scroll_position_popular = 0
let scroll_position_liked = 0


document.onreadystatechange = function () {
    if(document.readyState === 'complete'){
        loader.style.display = 'block'
        setTimeout(function() {
            loader.style.display = 'none'
        }, 1500)
        setTimeout(function() {
            content.style.display = 'block'
        }, 500)


    } else {
        loader.style.display = 'block'
        content.style.display = 'none'
    }
}

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

liked_scroll_derecha.addEventListener('click', () => {
    scroll_position_liked +=950
    scroll_movies_liked()
})

liked_scroll_izquierda.addEventListener('click', () => {
    scroll_position_liked -=950
    scroll_movies_liked()
})



const lazy_loader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log('si')
        console.log(entry)
    })
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

function  scroll_movies_liked() {
    const maxScroll = (liked_container.scrollWidth - liked_container.clientWidth);
    scroll_position_liked = Math.min(maxScroll, Math.max(0, scroll_position_liked));
    liked_container.style.transform = `translateX(-${scroll_position_liked}px)`;
}

async function get_trending_movies() {
    const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_key}`)
    const data = await res.json()
    const movies = data.results
    console.log(movies)
    let draw = movies.map(item => 
        `<div class="card_of_the_movie" >
              <img class="image_movie" src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${item.title}" onclick="get_movie_details(${item.id})">
              <button class="button_favorite" onclick='save_favorites(this, ${JSON.stringify(item).replace(/"/g, "&quot;")})'></button>
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
        <div class="all_card_info" >
            <div class="card_of_the_movie_pupular">
                <img src="https://image.tmdb.org/t/p/w500${peli.poster_path}" alt="" onclick="get_movie_details(${peli.id})" >
                <button class="button_favorite"  onclick='save_favorites(this, ${JSON.stringify(peli).replace(/"/g, "&quot;")})'></button>
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
        <div class="card_genero_cotainer" >
          <img src="https://image.tmdb.org/t/p/w500${peli.poster_path}" alt="${peli.overview}" onclick="get_movie_details(${peli.id})">
          <button class="button_favorite"  onclick='save_favorites(this, ${JSON.stringify(peli).replace(/"/g, "&quot;")})'></button>
         </div>
        `
        ).join('')

    pelis_container.innerHTML = draw
    peliculas_categoria.style.display = 'block'
}


let page = 1

async function get_paginated_by_category(id){

    const view = document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 15
    if(view) {
        page += 1
        const res = await fetch(`https://api.themoviedb.org/3/discover/movie?page=${page}&with_genres=${id}&api_key=${API_key}`)
        const data = await res.json()
        const movies = data.results
        console.log(movies)
        const draw = movies.map(peli => 
            `
            <div class="card_genero_cotainer" >
              <img src="https://image.tmdb.org/t/p/w500${peli.poster_path}" alt="${peli.overview}" onclick="get_movie_details(${peli.id})">
              <button class="button_favorite"  onclick='save_favorites(this, ${JSON.stringify(peli).replace(/"/g, "&quot;")})'></button>
            </div>
            `
            ).join('')

        pelis_container.insertAdjacentHTML('beforeend', draw)

    }

}

async function get_movies_by_search(param) {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${param}&api_key=${API_key}`)
    const data = await res.json()
    const movies = data.results
    const draw = movies.map(movie => 
        `
        <div class="card_genero_cotainer" >
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.overview}" onclick="get_movie_details(${movie.id})">
            <button class="button_favorite"  onclick='save_favorites(this, ${JSON.stringify(movie).replace(/"/g, "&quot;")})'></button>
       </div>
        
        `
        ).join('')

        container_search_movies.innerHTML = draw
}
let page_search = 1
async function get_movies_paginated_by_search(parametro) {
    page_search += 1
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?page=${page_search}&query=${parametro}&api_key=${API_key}`)
    const data = await res.json()
    const movies = data.results
    const draw = movies.map(movie => 
        `
        <div class="card_genero_cotainer" >
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.overview}" onclick="get_movie_details(${movie.id})">
            <button class="button_favorite"  onclick='save_favorites(this, ${JSON.stringify(movie).replace(/"/g, "&quot;")})'></button>
        </div>
        
        `
        ).join('')
    
        container_search_movies.insertAdjacentHTML('beforeend', draw)
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
        <div class="card_genero_cotainer" >
         <img src="https://image.tmdb.org/t/p/w500${peli.poster_path}" alt="${peli.overview}" onclick="get_movie_details(${peli.id})">
         <button class="button_favorite"  onclick='save_favorites(this, ${JSON.stringify(peli).replace(/"/g, "&quot;")})'></button>
         </div>
        `
      }).join('')

    pelis_recomendadas.innerHTML = draw

}

function liked_movie_list() {
    const item = JSON.parse(localStorage.getItem('liked_movies'))
    let movies

    if (item) {
        movies = item
    } else {
        movies = {}
    }

    return movies
}

function save_favorites(button, peli) {
    if(!button.style.backgroundColor) {
        button.style.backgroundColor = "blue";
    } else if (button.style.backgroundColor == "blue") {
        button.style.backgroundColor = "black"
    } else if(button.style.backgroundColor == "black") {
        button.style.backgroundColor = "blue"
    }


    const liked_movies = liked_movie_list()

    if (liked_movies[peli.id]) {
        liked_movies[peli.id] = undefined
    } else {
        liked_movies[peli.id] = peli
    }

    localStorage.setItem('liked_movies', JSON.stringify(liked_movies))
    draw_loked_movies() 
}


function draw_loked_movies() {
    const liked_movies = liked_movie_list()
    const info = Object.values(liked_movies)
    const draw = info.map(peli => 
        
        `<div class="card_of_the_movie" >
              <img class="image_movie" src="https://image.tmdb.org/t/p/w500${peli.poster_path}" alt="${peli.title}" onclick="get_movie_details(${peli.id})">
              <button class="button_favorite" onclick='save_favorites(this, ${JSON.stringify(peli).replace(/"/g, "&quot;")})' style='background-color: blue;'></button>
        </div>`
        ).join('')
        
    
        liked_container.innerHTML =  draw
    
}

draw_loked_movies()













