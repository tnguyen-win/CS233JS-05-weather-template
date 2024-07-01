import ForecastSummary from './components/ForecastSummary';

export default class Controller {
    static OPEN_WEATHER_MAP_DOMAIN = 'api.openweathermap.org';
    static GEOCODE_VERSION = '1.0';
    static FORECAST_VERSION = '2.5';
    static GEOCODE_ENDPOINT = 'geo/' + Controller.GEOCODE_VERSION + '/zip';
    static FORECAST_ENDPOINT = 'data/' + Controller.FORECAST_VERSION + '/forecast';
    static API_KEY = process.env.API_KEY;

    constructor() {
        // this.weatherURL = 'https://' + OPEN_WEATHER_MAP_DOMAIN + '/' + FORECAST_ENDPOINT + '?units=imperial&';
        // this.geoURL = 'https://' + OPEN_WEATHER_MAP_DOMAIN + '/' + GEOCODE_ENDPOINT + '?';
        // this.weatherURL = 'https://api.openweathermap.org/data/2.5/forecast?units=imperial&';
        // this.geoURL = 'https://api.openweathermap.org/geo/1.0/zip?';
        this.apiKey = Controller.API_KEY;

        this.$form = document.querySelector('#zipForm');
        this.$zipCode = document.querySelector('#zipCode');
        this.$forecastSummaries = document.querySelector('#forecast-summaries');
        this.$forecastDetails = document.querySelector('#forecast-details');
        // this.$dayHeader = document.querySelector('.day-header');
        // this.$weather = document.querySelector('.weather');
        this.$weatherItems = document.getElementsByClassName('weather-list-item');
        // this.$temperatureBreakdown = document.querySelector('.temperature-breakdown');
        // this.$miscDetails = document.querySelector('.misc-details');

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.$form.onsubmit = e => this.onFormSubmit(e);
    }

    // fetch(`${this.geoURL}zip=${this.state.zipCode},US&${this.apiKey}`)

    getGeocodeUrl(zipCode, country) {
        return 'https://' + Controller.OPEN_WEATHER_MAP_DOMAIN + '/' + Controller.GEOCODE_ENDPOINT + '?zip=' + zipCode + ',' + country + '&' + this.apiKey;
    }

    getCoordinates(zipCode, country) {
        // async getCoordinates(zipCode, country) {
        let geocodeUrl = this.getGeocodeUrl(zipCode, country);
        // const resp = await fetch(geocodeUrl);

        return fetch(geocodeUrl).then(resp => resp.json());
        // return await resp.json();
    }

    // fetch(`${this.weatherURL}lat=${this.state.city.lat}&lon=${this.state.city.lon}&${this.apiKey}`)

    // addParam()
    // toString()

    getForecastUrl(lat, lon, unitType) {
        return 'https://' + Controller.OPEN_WEATHER_MAP_DOMAIN + '/' + Controller.FORECAST_ENDPOINT + '?units=' + unitType + '&lat=' + lat + '&lon=' + lon + '&' + this.apiKey;
    }

    getForecast(lat, lon, unitType) {
        // async getForecast(lat, lon) {
        let forecastUrl = this.getForecastUrl(lat, lon, unitType);
        // const resp = await fetch(forecastUrl);

        return fetch(forecastUrl).then(resp => resp.json());
        // return await resp.json();
    }

    clearCurrentDay() {
        this.$form.reset();
        this.$forecastDetails.classList.add('d-none');
    }

    onFormSubmit(e) {
        /*
            Supported Forecast Suffix Types:
            • Standard
                • Kelvin
            • Imperial
                • Fahrenheit
                • Miles per Hour
            • Metric
                • Celsius
                • Meters per Second

            Notes:
            • Lowercase unit type.
            • Manually convert mathematically.
                • Server-side (faster) versus client-side (local access for without internet).
        */

        e.preventDefault();

        let form = e.target;
        let data = new FormData(form);
        let zipCode = data.get('zipCode');
        let locale = 'US';
        let unitType = 'Imperial';

        this.getCoordinates(zipCode, locale)
            .then(loc => {
                let data = this.getForecast(loc.lat, loc.lon, unitType);

                return Promise.all([data, loc]);
            })
            .then(forecastAndLoc => {
                let data, loc;

                [data, loc] = forecastAndLoc;

                let root = new ForecastSummary(data, loc.name, unitType);

                this.$forecastSummaries.innerHTML = root.render(this.$forecastSummaries, this.$forecastDetails);
            })
            .then(() => this.clearCurrentDay());
    }
}
