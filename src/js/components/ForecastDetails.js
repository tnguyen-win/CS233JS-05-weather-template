import { getWeekday } from '../dates';
import getTemperatureWithSuffix from '../forecast_types';

export const dayDetails = function(day, _name, temperature_type) {
    return `
        <h1 class="day-header">
            ${getWeekday(day.dt)} in ${_name}
        </h1>
        <div class="weather">
            <p>
                <img src="https://openweathermap.org/img/wn/${day.icon}.png" alt="day icon." />
                &nbsp;
                ${day.description}
            </p>
        </div>
        <div class="details">
            <div class="temperature-breakdown">
                <p>
                    Morning Temperature: ${getTemperatureWithSuffix(day.morningTemp, temperature_type)}
                </p>
                <p>
                    Day Temperature: ${getTemperatureWithSuffix(day.dayTemp, temperature_type)}
                </p>
                <p>
                    Evening Temperature: ${getTemperatureWithSuffix(day.eveningTemp, temperature_type)}
                </p>
                <p>
                    Night Temperature: ${getTemperatureWithSuffix(day.nightTemp, temperature_type)}
                </p>
            </div>
            <div class="misc-details">
                <p>
                    Atmospheric Pressure: ${day.pressure}hPa
                </p>
                <p>
                    Humidity: ${day.humidity}%
                </p>
                <p>
                    Wind Speed: ${day.wind}mph
                </p>
            </div>
        </div>
    `;
};

export default dayDetails;
