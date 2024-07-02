/** @jsx vNode */
/* eslint-disable */
import { vNode } from '@ocdla/view/view';
import ForecastDetails from './ForecastDetails';
import DayForecastSummary from './DayForecastSummary';
/* eslint-enable */
import Component from '@ocdla/component';
import WeatherForecast from '../models/WeatherForecast';

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
            // OCDLA JSX

            // $forecastDetails.innerHTML = <ForecastDetails day={getDays[data.index]} _name={this.city} forecast={this.forecast} unitType={this.unitType} />;
            // $forecastDetails.classList.remove('d-none');

            // Vanilla JS

            $forecastDetails.innerHTML = ForecastDetails(getDays[data.index], this.city, this.forecast, this.unitType);
            $forecastDetails.classList.remove('d-none');
        };

        this.delegate('click', $forecastSummaries, displayForecastDetails);

        // OCDLA JSX

        // return (
        //     <div>
        //         {getDays.map((day, i) => <DayForecastSummary day={day} i={i} forecast={this.forecast} unitType={this.unitType} />)}
        //     </div>
        // );

        // Vanilla JS

        for (const [i, day] of getDays.entries()) summaryHtml += DayForecastSummary(day, i, this.forecast, this.unitType);

        return $forecastSummaries.innerHTML = summaryHtml;
    };
}
