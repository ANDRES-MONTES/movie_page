let categorias_ancla = document.querySelector('#category_section')
let inicio_seccion = document.querySelector('#inicio_seccion')
let seguir_viendo_container = document.querySelector('.seguir_viendo')
let scroll_container = document.querySelector('.scroll_container')
let title_seguit_viendo = document.querySelector('.title_seguir_viendo')
let popular = document.querySelector('.popular')
let movie_categories = document.querySelector('.categoty_main_coontainer')
let genero_categoria = document.querySelector('.genro_de_categoria')
let busqueda_movie = document.querySelector('.busqueda_pelicula')
let input_movie = document.querySelector('.input-info')
let buscar_seccion = document.querySelector('.search_section')
let seccion_details_movie = document.querySelector('.movie_details_section')

categorias_ancla.addEventListener('click', () => {
    event.preventDefault()
    location.hash = '#category='
})

inicio_seccion.addEventListener('click', () => {
    event.preventDefault()
    location.hash = 'home'
})


window.addEventListener('hashchange', navigator)
window.addEventListener('load', navigator)

busqueda_movie.addEventListener('click', () => {
    location.hash = `#search=${input_movie.value}`
})







function navigator() {
    if(location.hash.startsWith('#trends')){
        trends_page()
    } else if (location.hash.startsWith('#search=')) {
        search_page()
    } else if (location.hash.startsWith('#movie=')) {
        movie_page()
    } else if (location.hash.startsWith('#category=')) {
        category_page()
    } else {
        home_page()
    }
}

function home_page(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Esto hace que el desplazamiento sea suave (opcional)
      })
    console.log('home')
    get_trending_movies()
    get_genres_movies()
    get_pupular_movies() 
    movie_categories.style.display = 'none'
    genero_categoria.style.display = 'none'
    buscar_seccion.style.display = 'none'
    scroll_container.style.display = 'block'
    title_seguit_viendo.style.display = 'block'
    popular.style.display = 'block'
    seccion_details_movie.style.display = 'none'
}

function category_page(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Esto hace que el desplazamiento sea suave (opcional)
      })
    movie_categories.style.display = 'block'
    genero_categoria.style.display = 'none'
    popular.style.display  = 'none'
    scroll_container.style.display = 'none'
    title_seguit_viendo.style.display = 'none'
    buscar_seccion.style.display = 'none'
    seccion_details_movie.style.display = 'none'
    console.log('CATEGORYY!!!!')

    let position = location.hash
    let split_hash = position.split('=')
    let near_to_the_value = split_hash[1]
    let split_mumber = near_to_the_value.split('-')
    let number = split_mumber[0]
    let genero = split_mumber[1]
    console.log(genero)
    
    if(number) {
        get_movies_by_category(number, genero)
    }

}

function movie_page(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Esto hace que el desplazamiento sea suave (opcional)
      })
    console.log('MOVIEE!!!!')
    movie_categories.style.display = 'none'
    genero_categoria.style.display = 'none'
    popular.style.display  = 'none'
    scroll_container.style.display = 'none'
    title_seguit_viendo.style.display = 'none'
    buscar_seccion.style.display = 'none'
    seccion_details_movie.style.display = 'block'

    let position = location.hash
    let number = position.split('=')
    get_movie_details_by_id(number[1])
    console.log(number)


}

function search_page(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Esto hace que el desplazamiento sea suave (opcional)
      })
    movie_categories.style.display = 'none'
    genero_categoria.style.display = 'none'
    popular.style.display  = 'none'
    scroll_container.style.display = 'none'
    title_seguit_viendo.style.display = 'none'
    seccion_details_movie.style.display = 'none'


    let palabra_A_buscar = input_movie.value
    get_movies_by_search(palabra_A_buscar)

    buscar_seccion.style.display = 'block'
    toggleBusqueda()

    console.log('searh!!!!')
}

function trends_page(){
    console.log('TRENDSSS')
}