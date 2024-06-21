/* jshint esversion: 6 */
import parseForecast from './weatherParsing';
import WeatherList from './view';

const regeneratorRuntime = require('regenerator-runtime');

export default class Controller {
    static OPEN_WEATHER_MAP_DOMAIN = 'api.openweathermap.org';
    static API_KEY = '';
    static GEOCODE_VERSION = '1.0';
    static FORECAST_VERSION = '2.5';
    static GEOCODE_ENDPOINT = 'geo/' + Controller.GEOCODE_VERSION + '/zip';
    static FORECAST_ENDPOINT = 'data/' + Controller.FORECAST_VERSION + '/forecast';

    constructor() {
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
        return 'https://' + Controller.OPEN_WEATHER_MAP_DOMAIN + '/' + Controller.GEOCODE_ENDPOINT + '?zip=' + zipCode + ',' + country + '&' + apiKey;
    }

    getCoordinates(zipCode, country) {
        // async getCoordinates(zipCode, country) {
        let geocodeUrl = this.getGeocodeUrl(zipCode, country, this.apiKey);
        // const resp = await fetch(geocodeUrl);

        return fetch(geocodeUrl).then(resp => resp.json());
        // return await resp.json();
    }

    // fetch(`${this.weatherURL}lat=${this.state.city.lat}&lon=${this.state.city.lon}&${this.apiKey}`)

    getForecastUrl(lat, lon, apiKey) {
        return 'https://' + Controller.OPEN_WEATHER_MAP_DOMAIN + '/' + Controller.FORECAST_ENDPOINT + '?units=imperial&' + 'lat=' + lat + '&' + 'lon=' + lon + '&' + apiKey;
    }

    clearCurrentDay() {
        this.$form.reset();
        this.$currentDay.classList.add('d-none');
        this.$dayHeader.innerHTML = '';
    }

    async onFormSubmit(e) {
        e.preventDefault();

        let form = e.target;
        let data = new FormData(form);
        let zipCode = data.get('zipCode');
        let geocodeUrl = this.getGeocodeUrl(zipCode, 'US', this.apiKey);
        let _name;
        let lat;
        let lon;
        const resp = await this.getCoordinates(zipCode, 'US');

        _name = resp.name;
        lat = resp.lat;
        lon = resp.lon;

        let forecastUrl = this.getForecastUrl(lat, lon, this.apiKey);

        // fetch(`${this.geoURL}zip=${this.state.zipCode},US&${this.apiKey}`)
        fetch(geocodeUrl)
            .then(resp => resp.json())
            .then(_ => {
                // fetch(`${this.weatherURL}lat=${this.state.city.lat}&lon=${this.state.city.lon}&${this.apiKey}`)
                fetch(forecastUrl)
                    .then(resp => resp.json())
                    .then(data => {
                        WeatherList(this.$weatherList, parseForecast(data.list, data.city.timezone), this.$currentDay, this.$dayHeader, _name, this.$weather, this.$temperatureBreakdown, this.$miscDetails);

                        this.clearCurrentDay();
                    })
            })
    }
}
