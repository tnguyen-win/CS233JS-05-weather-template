import Component from './Component';
import DayForecastSummary from './DayForecastSummary';
import ForecastDetails from './ForecastDetails';
import parseForecast from '../weatherParsing';

export default class ForecastSummary extends Component {
    constructor(data, city, unitType) {
        /*
            parseForecast() = Raw data.
            Model != [3, 3, 3, 3]
            Model = [df1, df2, df3]

            let forecast = new WeatherForecast(data);

            for (var day of forecast.getDays()) {
                let summaryHtml = day.getSummary();

                this.$forecastSummaries.innerHTML += summaryHtml;
            }
        */

        super();

        this.forecast = parseForecast(data.list, data.city.timezone);

        Object.assign(this, ({ city, unitType }));
    }

    render($forecastSummaries, $forecastDetails) {
        const displayForecastDetails = data => {
            const index = data.index;

            if (!index) return false;

            $forecastDetails.innerHTML = ForecastDetails(this.forecast[data.index], this.city, this.unitType);
            $forecastDetails.classList.remove('d-none');
        };

        this.delegate('click', $forecastSummaries, displayForecastDetails);

        return this.forecast.map((day, i) => DayForecastSummary(day, i, this.unitType)).join('\n');
    };
}
