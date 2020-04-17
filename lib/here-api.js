const fetch = require('node-fetch')

const HERE_APIKEY = process.env.HERE_APIKEY
const baseUrl = 'https://geocode.search.hereapi.com/v1/geocode'

const handleError = function (err) {
  const msg = err.statusText || err.message || err.status
  return Promise.reject(`Failed to retrieve geocode: ${msg}`)
}

const handleResponse = function (response) {
  return response.json().then(jsonResponse => {
    const position = jsonResponse['items'][0]['position']
    return [position.lat, position.lng]
  })
}

const getAddressGeocode = function (address, options = {}) {
  const location = address && address.trim() ? address.trim() : null
  const apikey = options.hereapikey || HERE_APIKEY

  if (!apikey) {
    return Promise.reject(`A HERE Location Services API kei is required`)
  } else if (!location) {
    return Promise.reject(`A valid address is required for geocoding`)
  } else {
    console.log(`getting geocode for ${location}`)

    const endpoint = `${baseUrl}?q=${encodeURIComponent(location)}&apiKey=${apikey}`
  
    return fetch(endpoint, {
        method: 'get',
        headers: {'Content-Type': 'application/json'}
      })
      .then(response => {
        if (!response.ok) {
          return handleError(response)
        } else {
          return handleResponse(response)
        }
      })
  }
}

module.exports = {
  getAddressGeocode: getAddressGeocode
}
