const APIKEY = 'c296b759'
const domain = 'https://www.omdbapi.com'

export const searchMovies = (query) => {
    return fetch(`${domain}/?s=${query}&apikey=${APIKEY}`)
        .then(response => response.json())
        .then(result => result.Search || [])
}


const delay = (wait) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, wait)
    })
}