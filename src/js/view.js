import { getWeekday } from './dates';

export const DayForecastSummary = function(day, i) {
    // export const DayForecastSummary = function(day) {
    return `
        <div class='weather-list-item d-inline-block text-bg-secondary border border-light' style='--bs-border-opacity: 0.1875;' data-index='${i}'>
            <h2>${day.dt.getMonth()} / ${day.dt.getDate()}</h2>
            <h3>${getWeekday(day.dt)}</h3>
            <h3>${day.minTemp}&deg;F | ${day.maxTemp}&deg;F</h3>
        </div>
    `;
};

export const ForecastDetails = function(forecast, i, _name) {
    return `
    <h1 class="day-header">
        ${getWeekday(forecast[i].dt)} in ${_name}
    </h1>
    <div class="weather">
        <p>
            <img src="https://openweathermap.org/img/w/04d.png" alt="Forecast icon." />
            &nbsp;
            ${forecast[i].description}
        </p>
    </div>
    <div class="details">
        <div class="temperature-breakdown">
            <p>
                Morning Temperature: ${forecast[i].morningTemp}&deg;F
            </p>
            <p>
                Day Temperature: ${forecast[i].dayTemp}&deg;F
            </p>
            <p>
                Evening Temperature: ${forecast[i].eveningTemp}&deg;F
            </p>
            <p>
                Night Temperature: ${forecast[i].nightTemp}&deg;F
            </p>
        </div>
        <div class="misc-details">
            <p>
                Atmospheric Pressure: ${forecast[i].pressure} hPa
            </p>
            <p>
                Humidity: ${forecast[i].humidity}%
            </p>
            <p>
                Wind Speed: ${forecast[i].wind} mph
            </p>
        </div>
    </div>
    `;
};
