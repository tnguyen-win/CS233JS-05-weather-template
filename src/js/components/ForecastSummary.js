// import { data } from 'autoprefixer';
// import { DayForecastSummary, ForecastDetails } from '../view';
import Component from './Component';
import DayForecastSummary from './DayForecastSummary';
import ForecastDetails from './ForecastDetails';
import parseForecast from '../weatherParsing';

export default class ForecastSummary extends Component {
    // constructor($weatherList, forecast, $forecastDetails, city) {
    constructor(data, city) {
        super();

        // Accepts forecast.
        // parseForecast(data.list, data.city.timezone)
        this.forecast = parseForecast(data.list, data.city.timezone);
        this.city = city;

        // let forecast = new WeatherForecast(data);

        // for (var day of forecast.getDays()) {
        //     let summaryHtml = day.getSummary();

        //     this.$forecastSummaries.innerHTML += summaryHtml;
        // }
    }

    render($forecastSummaries, $forecastDetails) {
        const displayForecastDetails = data => {
            const index = data.index;

            if (!index) return false;

            $forecastDetails.innerHTML = ForecastDetails(this.forecast, data.index, this.city);
            $forecastDetails.classList.remove('d-none');
        };

        this.delegate('click', $forecastSummaries, displayForecastDetails);

        return this.forecast.map((day, i) => DayForecastSummary(day, i)).join('\n');
    };
}
