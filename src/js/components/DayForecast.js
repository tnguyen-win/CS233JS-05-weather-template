import parseForecast from '../weatherParsing';
import DayForecastSummary from './DayForecastSummary';

export default class DayForecast {
    constructor(data) {
        Object.assign(this, ({ data }));
    }

    getDays = () => parseForecast(this.data.list, this.data.city.timezone);

    getSummary = (day, i, unitType) => DayForecastSummary(day, i, unitType);
}
