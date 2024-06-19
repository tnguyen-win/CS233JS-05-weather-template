/* jshint esversion: 6 */
import './general';
import parseForecast from './weatherParsing';
import { getWeekday, getDate } from './dates';

const regeneratorRuntime = require('regenerator-runtime');

class Weather {
    static OPEN_WEATHER_MAP_DOMAIN = 'api.openweathermap.org';
    static API_KEY = '';
    static GEOCODE_VERSION = '1.0';
    static FORECAST_VERSION = '2.5';
    static GEOCODE_ENDPOINT = 'geo/' + Weather.GEOCODE_VERSION + '/zip';
    static FORECAST_ENDPOINT = 'data/' + Weather.FORECAST_VERSION + '/forecast';

    // fetch(`${this.geoURL}zip=${this.state.zipCode},US&${this.apiKey}`)

    getGeocodeUrl(zipCode, country, apiKey) {
        return 'https://' + Weather.OPEN_WEATHER_MAP_DOMAIN + '/' + Weather.GEOCODE_ENDPOINT + '?zip=' + zipCode + ',' + country + '&' + apiKey;
    }

    // fetch(`${this.weatherURL}lat=${this.state.city.lat}&lon=${this.state.city.lon}&${this.apiKey}`)

    getForecastUrl(lat, lon, apiKey) {
        return 'https://' + Weather.OPEN_WEATHER_MAP_DOMAIN + '/' + Weather.FORECAST_ENDPOINT + '?units=imperial&' + 'lat=' + lat + '&' + 'lon=' + lon + '&' + apiKey;
    }

    constructor() {
        this.state = {
            timezoneOffset: 0,
            zipCode: '',
            city: {},
            forecast: [],
            selectedDate: null
        };
        // this.weatherURL = 'https://' + OPEN_WEATHER_MAP_DOMAIN + '/' + FORECAST_ENDPOINT + '?units=imperial&';
        // this.geoURL = 'https://' + OPEN_WEATHER_MAP_DOMAIN + '/' + GEOCODE_ENDPOINT + '?';
        // this.weatherURL = 'https://api.openweathermap.org/data/2.5/forecast?units=imperial&';
        // this.geoURL = 'https://api.openweathermap.org/geo/1.0/zip?';
        this.apiKey = 'appid=436318b3f99b10952c06599c1755c123';

        this.$form = document.querySelector('#zipForm');
        this.$zipCode = document.querySelector('#zipCode');
        this.$weatherList = document.querySelector('#weatherList');
        this.$currentDay = document.querySelector('#currentDay');
        this.$dayHeader = document.querySelector('.day-header');
        this.$weather = document.querySelector('.weather');
        this.$temperatureBreakdown = document.querySelector('.temperature-breakdown');
        this.$miscDetails = document.querySelector('.misc-details');

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.$form.addEventListener('submit', this.onFormSubmit);
    }

    onFormSubmit(e) {
        e.preventDefault();

        this.state.zipCode = this.$zipCode.value;

        // fetch(`${this.geoURL}zip=${this.state.zipCode},US&${this.apiKey}`)
        fetch(this.getGeocodeUrl(this.state.zipCode, 'US', this.apiKey))
            .then((res) => res.ok ? res.json() : (() => { throw new Error(res.status); })())
            .then(d1 => {
                this.state.city.name = d1.name;
                this.state.city.lat = d1.lat;
                this.state.city.lon = d1.lon;
                // fetch(`${this.weatherURL}lat=${this.state.city.lat}&lon=${this.state.city.lon}&${this.apiKey}`)
                fetch(this.getForecastUrl(this.state.city.lat, this.state.city.lon, this.apiKey))
                    .then((res) => res.ok ? res.json() : (() => { throw new Error(res.status); })())
                    .then(d2 => {
                        this.state.timezoneOffset = d2.timezoneOffset;
                        this.state.forecast = parseForecast(d2.list, this.timezoneOffset);
                        this.renderWeatherList(this.state.forecast);
                        this.$form.reset();
                        this.clearCurrentDay();
                    })
                    .catch(e => {
                        alert('There was a problem getting information. See the console for further details.');
                        console.log(`#2 | FETCH ERROR: ${e}`);
                        // console.log(`#2 | ${this.getForecastUrl(this.state.city.lat, this.state.city.lon, this.apiKey)}`);
                    });
            })
            .catch(e => {
                alert('There was a problem getting information. See the console for further details.');
                console.log(`#1 | FETCH ERROR: ${e}`);
                // console.log(`#1 | ${this.getGeocodeUrl(this.state.zipCode, 'US', this.apiKey)}`);
            });
    }

    renderWeatherListItem(wD, i) {
        return `
			<div class='weather-list-item d-inline-block text-bg-secondary border border-light' style='--bs-border-opacity: 0.1875;' data-index='${i}'>
				<h2>${wD[i].dt.getMonth()} / ${wD[i].dt.getDate()}</h2>
				<h3>${getWeekday(wD[i].dt)}</h3>
				<h3>${wD[i].minTemp}&deg;F | ${wD[i].maxTemp}&deg;F</h3>
			</div>
		`;
    }

    renderWeatherList(wD) {
        const weatherItems = document.getElementsByClassName('weather-list-item');

        this.$weatherList.innerHTML = wD.reduce((h, w) => h += this.renderWeatherListItem(wD, wD.indexOf(w)), '');

        for (let w in weatherItems) if (weatherItems[w].tagName === 'DIV') weatherItems[w].onclick = () => this.renderCurrentDay(w);
    }

    renderCurrentDay(i) {
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
    }

    clearCurrentDay() {
        this.$currentDay.classList.add('d-none');
        this.$dayHeader.innerHTML = '';
    }
}

var weather;

window.onload = () => weather = new Weather();
