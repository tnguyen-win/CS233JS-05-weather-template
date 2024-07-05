/** @jsx vNode */
/* eslint-disable-next-line */
import { vNode } from '@ocdla/view';
// import { getWeekday } from '@ocdla/date2';

export default function DayForecastSummary({ i, m, d, wd, low, high }) {

    // export default function DayForecastSummary({ day, i, forecast, unitType }) {
    // let m = (day.dt.getMonth() + 1) + '';
    // let d = day.dt.getDate() + '';
    // let wd = getWeekday(day.dt);
    // let low = forecast.getTemperatureWithUnitType(day.minTemp, unitType);
    // let high = forecast.getTemperatureWithUnitType(day.maxTemp, unitType);

    // console.log(m);
    // console.log(d);
    // console.log(wd);
    // console.log(low);
    // console.log(high);

    return (
        <div class='weather-list-item d-inline-block user-select-none text-bg-secondary border border-light' style='--bs-border-opacity: 0.1875;' data-index={i}>
            <h2>
                <div>
                    {m} / {d}
                </div>
            </h2>
            <h3>
                {wd}
            </h3>
            <h3>
                {low} | {high}
            </h3>
        </div>
    );
};
