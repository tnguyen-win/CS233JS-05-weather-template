import { getWeekday, getDate } from './dates';

const WeatherListItem = function (wD, i) {
    return `
        <div class='weather-list-item d-inline-block text-bg-secondary border border-light' style='--bs-border-opacity: 0.1875;' data-index='${i}'>
            <h2>${wD[i].dt.getMonth()} / ${wD[i].dt.getDate()}</h2>
            <h3>${getWeekday(wD[i].dt)}</h3>
            <h3>${wD[i].minTemp}&deg;F | ${wD[i].maxTemp}&deg;F</h3>
        </div>
    `;
};

const CurrentDay = function ($currentDay, $dayHeader, forecast, i, _name, $weather, $temperatureBreakdown, $miscDetails) {
    $currentDay.classList.remove('d-none');
    $dayHeader.innerHTML = `${getWeekday(forecast[i].dt)} in ${_name}`;
    $weather.innerHTML = `
    <p>
        <img src='https://openweathermap.org/img/w/04d.png' alt='Forecast icon.' />
        &nbsp;
        ${forecast[i].description}
    </p>
    `;
    $temperatureBreakdown.innerHTML = `
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
    `;
    $miscDetails.innerHTML = `
    <p>
        Atmospheric Pressure: ${forecast[i].pressure} hPa
    </p>
    <p>
        Humidity: ${forecast[i].humidity}%
    </p>
    <p>
        Wind Speed: ${forecast[i].wind} mph
    </p>
    `;
};

const WeatherList = function ($weatherList, forecast, $currentDay, $dayHeader, _name, $weather, $temperatureBreakdown, $miscDetails) {
    const $weatherItems = document.getElementsByClassName('weather-list-item');

    $weatherList.innerHTML = forecast.reduce((data, i) => data += WeatherListItem(forecast, forecast.indexOf(i)), '');

    for (let i in $weatherItems) if ($weatherItems[i].tagName === 'DIV') $weatherItems[i].onclick = () => CurrentDay($currentDay, $dayHeader, forecast, i, _name, $weather, $temperatureBreakdown, $miscDetails);
};

export default WeatherList;
