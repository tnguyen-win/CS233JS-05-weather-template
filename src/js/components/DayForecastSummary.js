import { getWeekday } from '@ocdla/date2';

export const DayForecastSummary = function(day, i, forecast, unitType) {
    return `
        <div class='weather-list-item d-inline-block user-select-none text-bg-secondary border border-light' style='--bs-border-opacity: 0.1875;' data-index='${i}'>
            <h2>
                <div>
                    ${day.dt.getMonth() + 1} / ${day.dt.getDate()}
                </div>
            </h2>
            <h3>${getWeekday(day.dt)}</h3>
            <h3>${forecast.getTemperatureWithUnitType(day.minTemp, unitType)} | ${forecast.getTemperatureWithUnitType(day.maxTemp, unitType)}</h3>
        </div>
    `;
};

export default DayForecastSummary;
