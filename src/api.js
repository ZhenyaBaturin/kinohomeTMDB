const API_KEY = '56774ab4c7b627a1a002e291486be7f3'
// запрос
const promise = fetch(
  `http://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Tenet`)
  .then(resolve => resolve.json())
  .then(data => data)
// выбранный фильм
// const promise = fetch(
//   `https://api.themoviedb.org/3/movie/343611?api_key=${API_KEY}&append_to_response=videos`)
//   .then(resolve => resolve.json())
//   .then(data => console.log(data))
export default promise
