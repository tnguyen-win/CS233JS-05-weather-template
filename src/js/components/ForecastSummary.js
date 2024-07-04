/** @jsx vNode */
/* eslint-disable */
import { vNode } from '@ocdla/view';
import ForecastDetails from './ForecastDetails';
import DayForecastSummary from './DayForecastSummary';
/* eslint-enable */
import Component from '@ocdla/component';
import { getWeekday } from '@ocdla/date2';

export default class ForecastSummary extends Component {
    // constructor(wf, data, city, unitType) {
    constructor(wf) {
        super();

        this.forecast = wf;

        // Object.assign(this, ({ wf.city, wf.unitType }));
        this.city = 'Eugene';
        this.unitType = 'imperial';
    }

    render($forecastSummaries, $forecastDetails) {
        const days = this.forecast.getDailyForecasts();
        // let summaryHtml = '';

        const displayForecastDetails = data => {
            // OCDLA JSX

            $forecastDetails.innerHTML = <ForecastDetails day={days[data.index]} _name={this.city} forecast={this.forecast} unitType={this.unitType} />;
            $forecastDetails.classList.remove('d-none');

            // Vanilla JS

            // $forecastDetails.innerHTML = ForecastDetails(days[data.index], this.city, this.forecast, this.unitType);
            // $forecastDetails.classList.remove('d-none');
        };

        this.delegate('click', $forecastSummaries, displayForecastDetails);

        // OCDLA JSX

        return (
            <div>
                {/* {days.map((day, i) => <DayForecastSummary day={day} i={i} forecast={this.forecast} unitType={this.unitType} />)} */}

                {days.map((day, i) => {
                    let m = (day.dt.getMonth() + 1) + '';
                    let d = day.dt.getDate() + '';
                    let wd = getWeekday(day.dt);
                    let low = this.forecast.getTemperatureWithUnitType(day.minTemp, this.unitType);
                    let high = this.forecast.getTemperatureWithUnitType(day.maxTemp, this.unitType);

                    return <DayForecastSummary i={i} m={m} d={d} wd={wd} low={low} high={high} />;
                })}
            </div>
        );

        // Vanilla JS

        // for (const [i, day] of days.entries()) summaryHtml += DayForecastSummary(day, i, this.forecast, this.unitType);

        // return $forecastSummaries.innerHTML = summaryHtml;
    };
}
