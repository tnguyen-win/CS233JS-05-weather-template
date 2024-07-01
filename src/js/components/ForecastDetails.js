import { getWeekday } from '@ocdla/date2';

export const dayDetails = function(day, _name, forecast, unitType) {
    return `
        <h1 class='day-header'>
            ${getWeekday(day.dt)} in ${_name}
        </h1>
        <div class='weather'>
            <p>
                <img src='https://openweathermap.org/img/wn/${day.icon}.png' alt='day icon.' />
                &nbsp;
                ${day.description}
            </p>
        </div>
        <div class='details'>
            <div class='temperature-breakdown'>
                <p>
                    Morning Temperature: ${forecast.getTemperatureWithUnitType(day.morningTemp, unitType)}
                </p>
                <p>
                    Day Temperature: ${forecast.getTemperatureWithUnitType(day.dayTemp, unitType)}
                </p>
                <p>
                    Evening Temperature: ${forecast.getTemperatureWithUnitType(day.eveningTemp, unitType)}
                </p>
                <p>
                    Night Temperature: ${forecast.getTemperatureWithUnitType(day.nightTemp, unitType)}
                </p>
            </div>
            <div class='misc-details'>
                <p>
                    Atmospheric Pressure: ${day.pressure} hPa
                </p>
                <p>
                    Humidity: ${day.humidity}%
                </p>
                <p>
                    Wind Speed: ${forecast.getWindSpeedWithUnitType(day.wind, unitType)}
                </p>
            </div>
        </div>
    `;
};

export default dayDetails;
