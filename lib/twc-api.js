const fetch = require('node-fetch')
const util = require('./utils.js')

const TWC_APIKEY = process.env.TWC_APIKEY
const baseUrl = 'https://api.weather.com/v3/wx/disease/tracker'
const locationTypes = ['country', 'state', 'county']

const handleError = function (err) {
  const msg = err.statusText || err.message || err.status
  return Promise.reject(`Failed to retrieve data: ${msg}`)
}

const handleResponse = function (response) {
  return response.json().then(jsonResponse => {
    return jsonResponse['covid19']
  })
}

const getCovidStats = function (location, options = {}) {
  const apikey = options.twcapikey || TWC_APIKEY
  const locationType = locationTypes.indexOf(options.locationType) > -1 ? options.locationType : 'county'
  const duration = '60day'

  const isPostalKey = util.isPostalKey(location)
  const locParam = isPostalKey? location : util.toGeocode(location)

  if (!locParam) {
    return Promise.reject(`Exected a valid geocode (e.g., [35.843686,-78.78548]) or postalKey (e.g., 90210:US) but received: ${location}`)
  } else {
    console.log(`getting ${locationType} data for ${locParam}`)

    const endpoint = `${baseUrl}/${locationType}/${duration}?format=json&apiKey=${apikey}&${isPostalKey ? 'postalKey' : 'geocode'}=${locParam}`
  
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
  getCovidStats: getCovidStats
}
