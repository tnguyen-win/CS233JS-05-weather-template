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

const CurrentDay = function (i) {
    this.$currentDay.classList.remove('d-none');
    this.$dayHeader.innerHTML = `${getWeekday(this.state.forecast[i].dt)} in ${this.state.city.name}`;
    this.$weather.innerHTML = `
		<p>
			<img src='https://openweathermap.org/img/w/04d.png' alt='Forecast icon' />
			&nbsp;
			${this.state.forecast[i].description}
		</p>
		`;
    this.$temperatureBreakdown.innerHTML = `
		<p>Morning Temperature: ${this.state.forecast[i].morningTemp}&deg;F</p>
		<p>Day Temperature: ${this.state.forecast[i].dayTemp}&deg;F</p>
		<p>Evening Temperature: ${this.state.forecast[i].eveningTemp}&deg;F</p>
		<p>Night Temperature: ${this.state.forecast[i].nightTemp}&deg;F</p>
		`;
    this.$miscDetails.innerHTML = `
		<p>Atmospheric Pressure: ${this.state.forecast[i].pressure} hPa</p>
		<p>Humidity: ${this.state.forecast[i].humidity}%</p>
		<p>Wind Speed: ${this.state.forecast[i].wind} mph</p>
		`;
};

const WeatherList = function (wD) {
    const weatherItems = document.getElementsByClassName('weather-list-item');

    this.$weatherList.innerHTML = wD.reduce((h, w) => h += this.renderWeatherListItem(wD, wD.indexOf(w)), '');

    for (let w in weatherItems) if (weatherItems[w].tagName === 'DIV') weatherItems[w].onclick = () => this.renderCurrentDay(w);
};

export default WeatherList;
