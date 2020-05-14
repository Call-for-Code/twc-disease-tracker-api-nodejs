# Connect your Node.js application to the Weather Company Data Disease Tracker API

Tracking a disease's progression is incredibly useful in a pandemic like COVID-19. The Weather Company created a Data Disease Tracker API that allows you to track the progression of a disease for a given location. It provides information regarding active diseases including confirmed cases, deaths, and recoveries over a period of up to 60 days in the past. 

In this tutorial, I show you how to connect a Node.js application to the Weather Company Data Disease Tracker API endpoint.

## Getting started

### Prerequisites

- Install [Node.js](https://nodejs.org/en/download/).
- Clone the [repository](https://github.com/Call-for-Code/twc-disease-tracker-api-nodejs).

### Steps

1. [Obtain a Weather Company API Key](#obtain-a-weather-company-api-key)
1. [Obtain a HERE Location Services API Key](#obtain-a-here-location-services-api-key)
1. [Install the CLI application](#install-the-cli-application)
1. [Run the CLI application](#run-the-cli-application)

#### Obtain a Weather Company API Key

If you're participating in the [Call for Code](https://developer.ibm.com/callforcode/) Global Challenge, you have access to The Weather Company API for COVID-19 Disease Tracking. 

Go to the [Call for Code Weather website](https://callforcode.weather.com/) and [register](https://callforcode.weather.com/register). A time-limited API key will be sent to you via email. The documentation for the Weather Company APIs for Call for Code can be found [here](https://callforcode.weather.com/documentation/).

#### Obtain a HERE Location Services API Key

When using the application, you may pass it a geocode (for example, '35.843686,-78.78548'), a postal key (for example, 90210:US), or an address. If you pass an address, the application will try to use HERE Location Services for geocoding.

To access the HERE Geocoding API, an API Key is required. Follow the instructions outlined in the [HERE Developer Portal](https://developer.here.com/ref/IBM_starterkit_Covid?create=Freemium-Basic) to generate a free [API Key](https://developer.here.com/documentation/authentication/dev_guide/topics/api-key-credentials.html).

#### Install the CLI application

To run this application on your local machine, from a terminal window:

1. Go into the cloned repository directory:
   
   ```
   $ cd twc-disease-tracker-api-nodejs
   ```  

2. Install the application globally to make it available as a command-line script:
   
   ```
   $ npm install -g .
   ```

   > **Note**: _To uninstall the script, run:_  
   > `npm uninstall -g twc-disease-tracker-api-nodejs`

When using the application, you can pass the API keys as command-line arguments or set them as environment variables. To configure your API keys in environment variables, from a terminal window:

3. Set your Weather Company Data API key
   
   ```
   $ export TWC_APIKEY=<YOUR_TWC_APIKEY>
   ```

4. (Optional) If would like to be able to pass an address (instead of geocode or postal key), set your HERE Location Services API key:
   ```
   $ export HERE_APIKEY=<YOUR_HERE_APIKEY>
   ```

#### Run the CLI application

> **Note**: _For more detailed usage information, see the in-app **help page** which you can access by executing:_ `covid-cli --help`

Use the command `covid-cli <location>` to display a table of total accumulated reported cases for the given location's county, state, or country. The location can be a geocode (Latitude, Longitude), a postal key (for example, 90210:US) or an address (if the HERE API is configured), as the following commands show:

- **Using geocode**
   ```shell
   $ covid-cli 42.35866,-71.05674
   ```
- **Using postal key**
  
   ```shell
   $ covid-cli 02109:US
   ```
   
- **Using address**
   
   ```shell
   $ covid-cli 'Boston, MA'
   ```
- **Sample output**
   
   ```
   Total accumlated COVID-19 reported cases in the past
   14 day(s) for Suffolk County (Population: 722023)
   ┌─────────┬──────────────┬───────────┬────────┐
   │ (index) │  dateReport  │ confirmed │ deaths │
   ├─────────┼──────────────┼───────────┼────────┤
   │    0    │ '2020-04-17' │   6820    │   0    │
   │    1    │ '2020-04-16' │   6820    │  120   │
   │    2    │ '2020-04-15' │   6279    │  120   │
   │    3    │ '2020-04-14' │   5872    │  106   │
   │    4    │ '2020-04-13' │   5579    │   88   │
   │    5    │ '2020-04-12' │   5359    │   81   │
   │    6    │ '2020-04-11' │   4926    │   66   │
   │    7    │ '2020-04-10' │   4534    │   56   │
   │    8    │ '2020-04-09' │   4041    │   50   │
   │    9    │ '2020-04-08' │   3600    │   42   │
   │   10    │ '2020-04-07' │   3245    │   41   │
   │   11    │ '2020-04-06' │   2929    │   28   │
   │   12    │ '2020-04-05' │   2658    │   26   │
   │   13    │ '2020-04-04' │   2429    │   24   │
   └─────────┴──────────────┴───────────┴────────┘
   ```

You can specify the (location) **level** of the data to retrieve or the number of **days** (maximum 60) through command-line options. The following command shows that you are looking for the latest data from New Bedford, Massachusetts in the last five days:

- **Command**
   
   ```shell
   $ covid-cli 'new bedford, ma' --level state --days 5
   ```

- **Output**

   When I ran that command, it returned these results:
   
   ```
   Total accumlated COVID-19 reported cases in the past
   5 day(s) for Massachusetts (Population: 6949503)
   ┌─────────┬──────────────┬───────────┬────────┐
   │ (index) │  dateReport  │ confirmed │ deaths │
   ├─────────┼──────────────┼───────────┼────────┤
   │    0    │ '2020-04-17' │   32181   │  1245  │
   │    1    │ '2020-04-16' │   32181   │  1245  │
   │    2    │ '2020-04-15' │   29918   │  1108  │
   │    3    │ '2020-04-14' │   28163   │  957   │
   │    4    │ '2020-04-13' │   26867   │  844   │
   └─────────┴──────────────┴───────────┴────────┘
   ```

You can also pass API keys as command-line options. The command-line options override any set environment variables. A HERE API Key is required only if you plan to pass an address instead of geocode or postal key. The following command is looking for data about a specific address in Cambridge, MA:

- **Command**
  
  ```shell
   $ covid-cli 'cambridge, ma' --twcapikey XXXXXXXXXX --hereapikey XXXXXXXXXX
   ```

- **Output**
   
   When I ran that command, it returned these results:
   
   ```
   Total accumlated COVID-19 reported cases in the past
   14 day(s) for Middlesex County (Population: 1503085)
   ┌─────────┬──────────────┬───────────┬────────┐
   │ (index) │  dateReport  │ confirmed │ deaths │
   ├─────────┼──────────────┼───────────┼────────┤
   │    0    │ '2020-04-17' │   7206    │   0    │
   │    1    │ '2020-04-16' │   7206    │  188   │
   │    2    │ '2020-04-15' │   6681    │  188   │
   │    3    │ '2020-04-14' │   6254    │  163   │
   │    4    │ '2020-04-13' │   5983    │  149   │
   │    5    │ '2020-04-12' │   5660    │  137   │
   │    6    │ '2020-04-11' │   4872    │  109   │
   │    7    │ '2020-04-10' │   4447    │   93   │
   │    8    │ '2020-04-09' │   4045    │   80   │
   │    9    │ '2020-04-08' │   3545    │   69   │
   │   10    │ '2020-04-07' │   3187    │   69   │
   │   11    │ '2020-04-06' │   2950    │   42   │
   │   12    │ '2020-04-05' │   2632    │   38   │
   │   13    │ '2020-04-04' │   2468    │   32   │
   └─────────┴──────────────┴───────────┴────────┘
   ```

## Conclusion
Now that you know how to connect your Node.js application to The Weather Company API for COVID-19 Disease Tracking, you are equipped to extend your knowledge and find new and creative ways to fight the disease.

## Resources

[The Weather Company - COVID-19](https://weather.com/coronavirus)  
[Call for Code - The Weather Company](https://callforcode.weather.com/)  
[Call for Code - COVID-19](https://developer.ibm.com/callforcode/getstarted/covid-19/)  
[HERE - Geocoding and Search](https://developer.here.com/documentation#search_and_geocoding_section)  
[Node.js](https://nodejs.org)  

## License

This code is licensed under Apache 2.0. Full license text is available in [LICENSE](https://github.com/Call-for-Code/twc-disease-tracker-api-nodejs/blob/master/LICENSE).
