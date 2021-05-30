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
function getMovieId (id) {
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
export { getPopulMoves, getMovieId, searchMulty }
