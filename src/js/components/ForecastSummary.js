import Component from '@ocdla/component';
import ForecastDetails from './ForecastDetails';
import DayForecast from './DayForecast';

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

        this.forecast = new DayForecast(data);

        Object.assign(this, ({ city, unitType }));
    }

    render($forecastSummaries, $forecastDetails) {
        const getDays = this.forecast.getDays();
        let summaryHtml = '';

        const displayForecastDetails = data => {
            $forecastDetails.innerHTML = ForecastDetails(getDays[data.index], this.city, this.unitType);
            $forecastDetails.classList.remove('d-none');
        };

        this.delegate('click', $forecastSummaries, displayForecastDetails);

        for (const [i, day] of getDays.entries()) summaryHtml += this.forecast.getSummary(day, i, this.unitType);

        return $forecastSummaries.innerHTML = summaryHtml;
    };
}
