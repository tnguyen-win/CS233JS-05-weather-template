import parseForecast from '../models/WeatherForecast';
import DayForecastSummary from './DayForecastSummary';

export default class DayForecast {
    constructor(data) {
        Object.assign(this, ({ data }));
    }

    getDays() {
        return parseForecast(this.data.list, this.data.city.timezone);
    }

    getSummary(day, i, unitType) {
        return DayForecastSummary(day, i, unitType);
    }
}
