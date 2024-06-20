/* jshint esversion: 6 */
import parseForecast from './weatherParsing';
import WeatherList from './components';

const regeneratorRuntime = require('regenerator-runtime');

export default class Weather {
    static OPEN_WEATHER_MAP_DOMAIN = 'api.openweathermap.org';
    static API_KEY = '';
    static GEOCODE_VERSION = '1.0';
    static FORECAST_VERSION = '2.5';
    static GEOCODE_ENDPOINT = 'geo/' + Weather.GEOCODE_VERSION + '/zip';
    static FORECAST_ENDPOINT = 'data/' + Weather.FORECAST_VERSION + '/forecast';

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

    // fetch(`${this.geoURL}zip=${this.state.zipCode},US&${this.apiKey}`)

    getGeocodeUrl(zipCode, country, apiKey) {
        return 'https://' + Weather.OPEN_WEATHER_MAP_DOMAIN + '/' + Weather.GEOCODE_ENDPOINT + '?zip=' + zipCode + ',' + country + '&' + apiKey;
    }

    getCoordinates(zipCode, country) {
        // async getCoordinates(zipCode, country) {
        let geocodeUrl = this.getGeocodeUrl(zipCode, country, this.apiKey);
        //     const resp = await fetch(geocodeUrl);

        return fetch(geocodeUrl).then(resp => resp.json());
        //     return await resp.json();
    }

    // fetch(`${this.weatherURL}lat=${this.state.city.lat}&lon=${this.state.city.lon}&${this.apiKey}`)

    getForecastUrl(lat, lon, apiKey) {
        return 'https://' + Weather.OPEN_WEATHER_MAP_DOMAIN + '/' + Weather.FORECAST_ENDPOINT + '?units=imperial&' + 'lat=' + lat + '&' + 'lon=' + lon + '&' + apiKey;
    }

    async onFormSubmit(e) {
        e.preventDefault();

        let form = e.target;
        let data = new FormData(form);
        // this.state.zipCode = this.$zipCode.value;
        let zipCode = data.get('zipCode');
        let geocodeUrl = this.getGeocodeUrl(zipCode, 'US', this.apiKey);
        let lat;
        let lon;
        const resp = await this.getCoordinates(zipCode, 'US');

        lat = resp.lat;
        lon = resp.lon;

        let forecastUrl = this.getForecastUrl(lat, lon, this.apiKey);

        // fetch(`${this.geoURL}zip=${this.state.zipCode},US&${this.apiKey}`)
        fetch(geocodeUrl)
            // .then(resp => resp.ok ? resp.json() : (() => { throw new Error(resp.status); })())
            .then(resp => resp.json())
            // .then(resp => console.log(typeof (resp)))
            .then(_ => {
                // fetch(`${this.weatherURL}lat=${this.state.city.lat}&lon=${this.state.city.lon}&${this.apiKey}`)
                fetch(forecastUrl)
                    // .then(resp => resp.ok ? resp.json() : (() => { throw new Error(resp.status); })())
                    .then(resp => resp.json())
                    // .then(resp => console.log(typeof (resp)))
                    .then(data => {
                        // this.state.timezoneOffset = d2.timezoneOffset;
                        // this.state.forecast = parseForecast(d2.list, this.timezoneOffset);
                        // console.log(data);
                        // console.log(data.city.timezone);
                        // console.log(parseForecast(data.list, data.city.timezone));
                        // this.renderWeatherList(this.state.forecast);
                        // WeatherList(parseForecast(data.list, data.city.timezone));
                        // this.$form.reset();
                        // this.clearCurrentDay();
                    })
                // .catch(e => {
                //     alert('There was a problem getting information. See the console for further details.');
                //     console.log(`#2 | FETCH ERROR: ${e}`);
                //     // console.log(`#2 | ${this.getForecastUrl(this.state.city.lat, this.state.city.lon, this.apiKey)}`);
                // });
            })
        // .catch(e => {
        //     alert('There was a problem getting information. See the console for further details.');
        //     console.log(`#1 | FETCH ERROR: ${e}`);
        //     // console.log(`#1 | ${this.getGeocodeUrl(this.state.zipCode, 'US', this.apiKey)}`);
        // });
    }

    clearCurrentDay() {
        this.$currentDay.classList.add('d-none');
        this.$dayHeader.innerHTML = '';
    }
}
