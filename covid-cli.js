#!/usr/bin/env node

const path = require('path')
const { program } = require('commander')

const twcApi = require('./lib/twc-api.js')
const hereApi = require('./lib/here-api')
const utils = require('./lib/utils.js')

const version = require(path.join(__dirname, 'package.json')).version

const runGlobal = function (options) {
  twcApi.getCovidGlobalStats()
    .then(stats => {
      if (options.json) {
        console.log(stats)
      } else {
        utils.printGlobalStats(stats, ['recordLocation', 'totalPopulation', 'confirmed', 'deaths'])
      }
    })
    .catch(console.error)
}

const run = function (locArg, options) {
  const location = utils.isPostalKey(locArg) ? locArg : utils.toGeocode(locArg)

  let locationPromise

  if (!location) {
    locationPromise = hereApi.getAddressGeocode(locArg, options)
  } else {
    locationPromise = Promise.resolve(location)
  }
  
  locationPromise
    .then(l => {
      return twcApi.getCovidStats(l, options)
    })
    .then(stats => {
      if (options.json) {
        console.log(stats)
      } else {
        utils.printStats(stats, ['dateReport', 'confirmed', 'deaths'], options.days)
      }
    })
    .catch(console.error)
}

program
  .description(`Displays total accumlated COVID-19 reported cases for a given location.
Location can be a geocode (e.g., '35.8436,-78.7854'), a postal key
(e.g., '90210:US'), or an address (if a HERE API Key is configured).`)
  .usage('<location> [options]')
  .option('-h, --hereapikey <here_api_key>', 'HERE Location Services API key. Default is HERE_APIKEY environment variable')
  .option('-w, --twcapikey <twc_api_key>', 'The Weather Company API key. Default is TWC_APIKEY environment variable')
  .option('-l, --level <country|state|county>', 'Set the level of data to retrieve. Default is county')
  .option('-d, --days <num_of_days>', 'Number of past days (maximum 60) for reports. Default is 30 days')
  .option('-g, --global', 'Display total counts for a set countries globally')
  .option('-j, --json', 'Display the full JSON response from the TWC API')
  .helpOption('-e, --help', 'Display help information')
  .version(version, '-v, --version', 'Output the version number')

program.parse(process.argv);

// Sample locations: [lat, lon]
const loc = {
  boston:     [42.3600, -71.06536],      // Boston, MA, United States
  raleigh:    [35.843686, -78.78548],    // Raleigh, NC, United States
  losangeles: [34.040873, -118.482745],  // Los Angeles, CA, United States
  lakecity:   [44.4494119, -92.2668435], // Lake City, MN, United States
  newyork:    [40.742089, -73.987908],   // New York, NY, United States
  hawaii:     [33.40, -83.42],           // Hawaii, United States,
  dover:      [40.8838889, -74.5625]     // Dover, NJ, United States
}

// const location = loc.dover
const commandArgs = program.args.join(' ')

const commandOpts = {
  twcapikey: program.twcapikey,
  hereapikey: program.hereapikey,
  days: program.days || 14,
  locationType: program.level,
  json: program.json,
  globally: program.global
}


if (commandOpts.globally) {
  runGlobal(commandOpts)
} else if (commandArgs) {
  run(commandArgs, commandOpts)
} else {
  console.error('command \'covid-cli <location>\' argument missing or invalid.\r\n')
  program.help()
}