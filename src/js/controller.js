import parseForecast from './weatherParsing';
// import WeatherList from './view';
import ForecastSummary from './components/ForecastSummary';

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
        this.apiKey = process.env.API_KEY;

        this.$form = document.querySelector('#zipForm');
        this.$zipCode = document.querySelector('#zipCode');
        this.$forecastSummaries = document.querySelector('#forecast-summaries');
        this.$forecastDetails = document.querySelector('#forecast-details');
        // this.$dayHeader = document.querySelector('.day-header');
        // this.$weather = document.querySelector('.weather');
        // this.$weatherItems = document.getElementsByClassName('weather-list-item');
        // this.$temperatureBreakdown = document.querySelector('.temperature-breakdown');
        // this.$miscDetails = document.querySelector('.misc-details');

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

    // addParam()
    // toString()

    getForecastUrl(lat, lon, apiKey) {
        return 'https://' + Controller.OPEN_WEATHER_MAP_DOMAIN + '/' + Controller.FORECAST_ENDPOINT + '?units=imperial&' + 'lat=' + lat + '&' + 'lon=' + lon + '&' + apiKey;
    }

    getForecast(lat, lon) {
        let forecastUrl = this.getForecastUrl(lat, lon, this.apiKey);

        return fetch(forecastUrl).then(resp => resp.json());
    }

    // WIP

    clearCurrentDay() {
        this.$form.reset();
        this.$forecastDetails.classList.add('d-none');
    }

    onFormSubmit(e) {
        e.preventDefault();

        let form = e.target;
        let data = new FormData(form);
        let zipCode = data.get('zipCode');
        let locale = 'US';

        this.getCoordinates(zipCode, locale)
            .then(loc => {
                let data = this.getForecast(loc.lat, loc.lon);

                return Promise.all([data, loc]);
            })
            .then(forecastAndLoc => {
                let data, loc;

                [data, loc] = forecastAndLoc;

                // let forecast = new WeatherForecast(data);

                // for (var day of forecast.getDays()) {
                //     let summaryHtml = day.getSummary();

                //     this.$forecastSummaries.innerHTML += summaryHtml;
                // }

                let root = new ForecastSummary(parseForecast(data.list, data.city.timezone), loc.name);

                this.$forecastSummaries.innerHTML = root.render();
                root.assignEventHandlers(this.$forecastDetails);


                // for (let i in $weatherItems) {
                //     if ($weatherItems[i].tagName === 'DIV') {
                //         $weatherItems[i].onclick = () => {
                //             $forecastDetails.classList.remove('d-none');
                //             $forecastDetails.innerHTML = ForecastDetails(forecast, i, city);
                //         }
                //     }
                // }

                // WeatherList(this.$forecastSummaries, parseForecast(data.list, data.city.timezone), this.$forecastDetails, loc.name);
            })
            .then(() => this.clearCurrentDay());
    }
}
