import { getWeekday } from '../dates';

export const DayForecastSummary = function(day, i) {
    return `
        <div class='weather-list-item d-inline-block user-select-none text-bg-secondary border border-light' style='--bs-border-opacity: 0.1875;' data-index='${i}'>
            <h2>
                <div>
                    ${day.dt.getMonth()} / ${day.dt.getDate()}
                </div>
            </h2>
            <h3>${getWeekday(day.dt)}</h3>
            <h3>${day.minTemp}&deg;F | ${day.maxTemp}&deg;F</h3>
        </div>
    `;
};

export default DayForecastSummary;
