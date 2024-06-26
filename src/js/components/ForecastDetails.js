import { getWeekday } from '../dates';

export const ForecastDetails = function(forecast, i, _name) {
    /*
        Don't embed / hardcode:
        • Images.
        • Ending suffix types.

        Dynamically returned images can be of different sizes.

        forecast[i].morningTemp != morningTemp
    */

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

export default ForecastDetails;
