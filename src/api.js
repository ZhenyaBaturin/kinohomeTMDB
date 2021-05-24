const API_KEY = '56774ab4c7b627a1a002e291486be7f3'
// запрос
export default function getPopulMoves (page = 1) {
  const topPath = 'http://api.themoviedb.org/3/movie/top_rated'
  const lang = 'ru-RU'
  const promise = fetch(
    `${topPath}?api_key=${API_KEY}&language=${lang}&page=${page}`)
    .then(resolve => resolve.json())
    .then(data => data)

  return promise
}

// const topPath = 'http://api.themoviedb.org/3/movie/top_rated'
// const lang = 'ru-RU'
// const page = 1
// const promise = fetch(
//   `${topPath}?api_key=${API_KEY}&language=${lang}&page=${page}`)
//   .then(resolve => resolve.json())
//   .then(data => data)
// export default promise
