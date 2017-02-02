const fetch = require('node-fetch')

const apikey = process.env.MUSIXMATCH_KEY
const apiUrl = 'https://api.musixmatch.com/ws/1.1/'

const toParams = (obj) => Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&')

const trackSearch = async (query) => {
  const command = 'track.search'
  const params = {
    format: 'json',
    q_lyrics: query,
    apikey: apikey,
    page_size: 1
  }
  let response = await fetch(`${apiUrl}${command}?${toParams(params)}`,{
    method: 'GET',
    headers: { Accept: 'text/plain' }
  })
  if(response.status !== 200){
    throw(new Error(response))
  } else {
    response = await response.json()
    response = response.message.body.track_list
  }
  return response
}

module.exports = {trackSearch}