
const reset = '\x1b[0m'
const bold = '\x1b[1m'

const coordinatesRegex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/
const postalkeyRegex = /.+:[a-zA-Z]{2}$/

const toGeocode = function (location) {
  let geocode = null

  if (typeof location === 'string' && location.split(',').length === 2) {
    geocode = location
  } else if (Array.isArray(location) && location.length == 2) {
    geocode = location.join(',')
  }

  if (geocode && coordinatesRegex.test(geocode)) {
    return geocode
  } else {
    return null
  }
}

const isPostalKey = function (location) {
  return (typeof location === 'string' && postalkeyRegex.test(location))
}

const printStats = function (stats, columnNames, rows = 14) {
  const tableData = []

  for (let i = 0; i < rows; i++) {
    const data = {}

    columnNames.forEach(n => {
      data[n] = stats[n][i] || 0
    })

    tableData.push(data)
  }

  console.log('')
  console.log(`${bold}Total accumlated COVID-19 reported cases in the past`)
  console.log(`${rows} day(s) for ${stats.recordLocation} (Population: ${stats.totalPopulation})${reset}`)
  console.table(tableData)
  console.log('')
}

const printGlobalStats = function (stats, columnNames, rows = 20) {
  const tableData = []

  const length = rows > 0 ? rows : stats[columnNames[0]].length

  for (let i = 0; i < length; i++) {
    const data = {}

    columnNames.forEach(n => {
      data[n] = stats[n][i] || 0
    })

    tableData.push(data)
  }

  console.log('')
  console.log(`${bold}Total accumlated COVID-19 reported cases for the top ${length} countries${reset}`)
  console.table(tableData)
  console.log('')
}

module.exports = {
  isPostalKey: isPostalKey,
  toGeocode: toGeocode,
  printStats: printStats,
  printGlobalStats: printGlobalStats
}
