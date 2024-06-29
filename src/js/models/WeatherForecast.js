// import DayForecast from './components/DayForecast';

/*
    Model = Data that is taken in.
    Data is useless in regard to what the customer wants.
    It's the job of the model to save the data into instance variables.
    That are consistent with what data is accessed by the customer and corresponding methods and features.
    Only place in the application that has data consumed.
*/

// class WeatherForecast {
//     constructor(data) {
//         let simpleForecast = [];
//         const MIDNIGHT = getIndexOfMidnight(forecast[0].dt, timezoneOffset);
//         const NOON = 4;
//         const SIXAM = 2;
//         const SIXPM = 6;
//         const NINEPM = 7;
//         const MORNING = SIXAM;
//         const DAY = NOON;
//         const EVENING = SIXPM;
//         const NIGHT = NINEPM;
//         const PERDAY = 8;

//         for (let i = MIDNIGHT; i < data.length - NINEPM; i += PERDAY) {
//             let oneDay = {};

//             oneDay.dt = new Date(forecast[i + NOON].dt * 1000);
//             oneDay.temp = forecast[i + NOON].main.temp;
//             oneDay.minTemp = findMinTemp(forecast, i);
//             oneDay.maxTemp = findMaxTemp(forecast, i);
//             oneDay.morningTemp = forecast[i + MORNING].main.temp;
//             oneDay.dayTemp = forecast[i + DAY].main.temp;
//             oneDay.eveningTemp = forecast[i + EVENING].main.temp;
//             oneDay.nightTemp = forecast[i + NIGHT].main.temp;
//             oneDay.description = forecast[i + NOON].weather[0].description;
//             oneDay.icon = forecast[i + NOON].weather[0].icon;
//             oneDay.pressure = forecast[i + NOON].main.pressure;
//             oneDay.wind = forecast[i + NOON].wind.speed;
//             oneDay.humidity = forecast[i + NOON].main.humidity;

//             simpleForecast.push(oneDay);
//         }
//     }
// }

function getIndexOfMidnight(firstDate) {
    let dt = firstDate * 1000;
    let date = new Date(dt);
    let localHours = date.getHours();
    let firstMidnightIndex = (localHours > 2) ? Math.round((24 - localHours) / 3) : Math.abs(Math.round(localHours / 3));

    return firstMidnightIndex;
}

function findMinTemp(forecast, indexOfMidnight) {
    let min = forecast[indexOfMidnight].main.temp_min;

    for (let i = indexOfMidnight + 1; i < indexOfMidnight + 8; i++) if (forecast[i].main.temp_min < min) min = forecast[i].main.temp_min;

    return min;
}

function findMaxTemp(forecast, indexOfMidnight) {
    let max = forecast[indexOfMidnight].main.temp_max;

    for (let i = indexOfMidnight + 1; i < indexOfMidnight + 8; i++) if (forecast[i].main.temp_max > max) max = forecast[i].main.temp_max;

    return max;
}

export default function parseForecast(forecast, timezoneOffset) {
    let simpleForecast = [];
    const MIDNIGHT = getIndexOfMidnight(forecast[0].dt, timezoneOffset);
    const NOON = 4;
    const SIXAM = 2;
    const SIXPM = 6;
    const NINEPM = 7;
    const MORNING = SIXAM;
    const DAY = NOON;
    const EVENING = SIXPM;
    const NIGHT = NINEPM;
    const PERDAY = 8;

    /*
        The first thing we must do is split the array into 3-4 separate arrays.
        Each array of 8 elements.
        Measured at intervals of 3 hours.
    */

    for (let i = MIDNIGHT; i < forecast.length - NINEPM; i += PERDAY) {
        let oneDay = {};

        oneDay.dt = new Date(forecast[i + NOON].dt * 1000);
        oneDay.temp = forecast[i + NOON].main.temp;
        oneDay.minTemp = findMinTemp(forecast, i);
        oneDay.maxTemp = findMaxTemp(forecast, i);
        oneDay.morningTemp = forecast[i + MORNING].main.temp;
        oneDay.dayTemp = forecast[i + DAY].main.temp;
        oneDay.eveningTemp = forecast[i + EVENING].main.temp;
        oneDay.nightTemp = forecast[i + NIGHT].main.temp;
        oneDay.description = forecast[i + NOON].weather[0].description;
        oneDay.icon = forecast[i + NOON].weather[0].icon;
        oneDay.pressure = forecast[i + NOON].main.pressure;
        oneDay.wind = forecast[i + NOON].wind.speed;
        oneDay.humidity = forecast[i + NOON].main.humidity;

        simpleForecast.push(oneDay);
    }

    return simpleForecast;
}


// Should be in src/models/WeatherForecast
// See also src/models/OneDayForecast.js
// differentiated between WeatherForecast *component by its import path.
// import
// export default class WeatherForecast {
//     #dailyForecasts = [];

//     constructor(data) {
//         this.#dailyForecasts = parse(data);
//     }

//     // The returned data is an array consisting of a sequence of 3-hour forecast samples.
//     // The first sample is taken at 00:00:00 and last is taken at 21:00:00.
//     // This means that we have 8 samples per day.
//     parse(data) {
//         // The number of data samples per day.
//         const DAILY_SAMPLES = 8;

//         // Store our daily forecast samples in groups; makes life easier.
//         // this is an array of arrays.
//         const days = [];

//         // Calculate the number of days in the forecast.
//         const NUM_DAYS = data.length / DAILY_SAMPLES;

//         // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
//         // Below, "group" means a collection of 8 samples.
//         for (let group = 1; group <= numDays; group++) {
//             let samples = data.splice(0, DAILY_SAMPLES);

//             days.push(samples);
//         }

//         // Now that we have the raw data organized by day, we can process it further.
//         this.days = days.map(day => new OneDayForecast(day));

//         // All done.  :-)
//     }

//     getIndexOfMidnight(firstDate) {
//         let dt = firstDate * 1000;
//         let date = new Date(dt);
//         let localHours = date.getHours(); firstMidnightIndex = localHours > 2 ? Math.round((24 - localHours) / 3) : Math.abs(Math.round(localHours / 3));

//         return firstMidnightIndex;
//     }



//     static getTemperatureWithUnitType(value, unitType) {
//         return unitType === "Imperial" ? Math.round(value) + "&deg; F" : unitType === "Metric" ? Math.round(value) + "&deg; C" : " [Unknown Type]";
//     }

//     static getWindSpeedWithUnitType(value, unitType) {
//         return unitType === "Imperial" ? value + " mph" : unitType === "Metric" ? value + " mps" : " [Unknown Type]";
//     }
// }
