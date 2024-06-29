import DayForecastSummary from '../components/DayForecastSummary';
import OneDayForecast from './OneDayForecast';
export default class WeatherForecast {
    #dailyForecasts = [];

    constructor(data) {
        this.#dailyForecasts = this.parse(data);
    }

    // The returned data is an array consisting of a sequence of 3-hour forecast samples.
    // The first sample is taken at 00:00:00 and last is taken at 21:00:00.
    // This means that we have 8 samples per day.
    parse(data) {
        // The number of data samples per day.
        const DAILY_SAMPLES = 8;

        // Store our daily forecast samples in groups; makes life easier.
        // this is an array of arrays.
        const days = [];

        // Calculate the number of days in the forecast.
        const NUM_DAYS = data.length / DAILY_SAMPLES;

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
        // Below, "group" means a collection of 8 samples.
        for (let group = 1; group <= NUM_DAYS; group++) {
            let samples = data.splice(0, DAILY_SAMPLES);

            days.push(samples);
        }

        // Now that we have the raw data organized by day, we can process it further.
        return days.map(day => new OneDayForecast(day));

        // All done.  :-)
    }

    getDailyForecasts() {
        return this.#dailyForecasts;
    }
    

    
    
    static getTemperatureWithUnitType(value, unitType) {
        return unitType === "Imperial" ? Math.round(value) + "&deg; F" : unitType === "Metric" ? Math.round(value) + "&deg; C" : " [Unknown Type]";
    }

    static getWindSpeedWithUnitType(value, unitType) {
        return unitType === "Imperial" ? value + " mph" : unitType === "Metric" ? value + " mps" : " [Unknown Type]";
    }
}
