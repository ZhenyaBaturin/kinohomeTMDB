const API_KEY = '56774ab4c7b627a1a002e291486be7f3'
// запрос
function getPopulMoves (page = 1) {
  const topPath = 'http://api.themoviedb.org/3/movie/top_rated'
  const lang = 'ru-RU'
  const promise = fetch(
    `${topPath}?api_key=${API_KEY}&language=${lang}&page=${page}`)
    .then(resolve => resolve.json())
    .then(data => data)
  return promise
}

function getMovieOnId (id) {
  const topPath = 'http://api.themoviedb.org/3/movie/'
  const lang = 'ru-RU'
  const promise = fetch(
    `${topPath}${id}?api_key=${API_KEY}&language=${lang}`)
    .then(resolve => resolve.json())
    .then(data => data)
  return promise
}

function searchMulty (name) {
  const topPath = 'https://api.themoviedb.org/3/search/multi'
  const lang = 'ru-RU'
  const promise = fetch(
    `${topPath}?api_key=${API_KEY}&language=${lang}&query=${name}`)
    .then(resolve => resolve.json())
    .then(data => data)
  return promise
}

function getPersonOnId (id) {
  const topPath = 'https://api.themoviedb.org/3/person/'
  const lang = 'ru-RU'
  const promise = fetch(
    `${topPath}${id}?api_key=${API_KEY}&language=${lang}`)
    .then(resolve => resolve.json())
    .then(data => data)
  return promise
}

function getPersonOnIdMovie (id) {
  const topPath = 'https://api.themoviedb.org/3/person/'
  const lang = 'ru-RU'
  const movie = 'movie_credits'
  const promise = fetch(
    `${topPath}${id}/${movie}?api_key=${API_KEY}&language=${lang}`)
    .then(resolve => resolve.json())
    .then(data => data)
  return promise
}

function getPersonOnIdTv (id) {
  const topPath = 'https://api.themoviedb.org/3/person/'
  const lang = 'ru-RU'
  const tv = 'tv_credits'
  const promise = fetch(
    `${topPath}${id}/${tv}?api_key=${API_KEY}&language=${lang}`)
    .then(resolve => resolve.json())
    .then(data => data)
  return promise
}
function getPersonOnIdExt (id) {
  const topPath = 'https://api.themoviedb.org/3/person/'
  const lang = 'ru-RU'
  const ext = 'external_ids'
  const promise = fetch(
    `${topPath}${id}/${ext}?api_key=${API_KEY}&language=${lang}`)
    .then(resolve => resolve.json())
    .then(data => data)
  return promise
}
function getPersonOnIdImg (id) {
  const topPath = 'https://api.themoviedb.org/3/person/'
  const lang = 'ru-RU'
  const img = 'images'
  const promise = fetch(
    `${topPath}${id}/${img}?api_key=${API_KEY}&language=${lang}`)
    .then(resolve => resolve.json())
    .then(data => data)
  return promise
}

function getGenre () {
  const topPath = 'https://api.themoviedb.org/3/genre/movie/list'
  const lang = 'ru-RU'
  const promise = fetch(
    `${topPath}?api_key=${API_KEY}&language=${lang}`)
    .then(resolve => resolve.json())
    .then(data => data)
  return promise
}

export { getPopulMoves, getMovieOnId, searchMulty, getPersonOnId, getPersonOnIdMovie, getPersonOnIdTv, getPersonOnIdExt, getPersonOnIdImg, getGenre }
