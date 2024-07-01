import Component from '@ocdla/component';
import ForecastDetails from './ForecastDetails';
import WeatherForecast from '../models/WeatherForecast';
import DayForecastSummary from './DayForecastSummary';

export default class ForecastSummary extends Component {
    constructor(data, city, unitType) {
        super();

        this.forecast = new WeatherForecast(data.list);

        Object.assign(this, ({ city, unitType }));
    }

    render($forecastSummaries, $forecastDetails) {
        const getDays = this.forecast.getDailyForecasts();
        let summaryHtml = '';

        const displayForecastDetails = data => {
            $forecastDetails.innerHTML = ForecastDetails(getDays[data.index], this.city, this.forecast, this.unitType);
            $forecastDetails.classList.remove('d-none');
        };

        this.delegate('click', $forecastSummaries, displayForecastDetails);

        for (const [i, day] of getDays.entries()) summaryHtml += DayForecastSummary(day, i, this.forecast, this.unitType);

        return $forecastSummaries.innerHTML = summaryHtml;
    };
}
