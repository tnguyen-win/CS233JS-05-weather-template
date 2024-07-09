/** @jsx vNode */
/* eslint-disable */
import { vNode, View } from '@ocdla/view';
import Sample from './models/Sample';
import Forecast from './components/Forecast';
/* eslint-enable */
import WeatherForecast from './models/WeatherForecast';

export default class App {
    static OPEN_WEATHER_MAP_DOMAIN = 'api.openweathermap.org';
    static GEOCODE_VERSION = '1.0';
    static FORECAST_VERSION = '2.5';
    static GEOCODE_ENDPOINT = 'geo/' + App.GEOCODE_VERSION + '/zip';
    static CURRENT_WEATHER_ENDPOINT = 'data/' + App.FORECAST_VERSION + '/weather';
    static FORECAST_ENDPOINT = 'data/' + App.FORECAST_VERSION + '/forecast';
    static API_KEY = process.env.API_KEY;

    constructor() {
        this.apiKey = App.API_KEY;

        if (!this.apiKey) alert('API key was unspecified.');
    }

    getGeocodeUrl(zipCode, country) {
        return 'https://' + App.OPEN_WEATHER_MAP_DOMAIN + '/' + App.GEOCODE_ENDPOINT + '?zip=' + zipCode + ',' + country + '&appid=' + this.apiKey;
    }

    getCoordinates(zipCode, country) {
        // async getCoordinates(zipCode, country) {
        const geocodeUrl = this.getGeocodeUrl(zipCode, country);
        // const resp = await fetch(geocodeUrl);

        return fetch(geocodeUrl).then(resp => resp.json());
        // return await resp.json();
    }

    getCurrentWeatherUrl(lat, lon, unitType, lang) {
        return 'https://' + App.OPEN_WEATHER_MAP_DOMAIN + '/' + App.CURRENT_WEATHER_ENDPOINT + '?units=' + unitType + '&lat=' + lat + '&lon=' + lon + '&lang=' + lang + '&appid=' + this.apiKey;
    }

    // addParam()
    // toString()

    getForecastUrl(lat, lon, unitType, mode) {
        return 'https://' + App.OPEN_WEATHER_MAP_DOMAIN + '/' + App.FORECAST_ENDPOINT + '?units=' + unitType + '&lat=' + lat + '&lon=' + lon + '&mode=' + mode + '&appid=' + this.apiKey;
    }

    getCurrentWeather(lat, lon, unitType, lang) {
        // async getCurrentWeather(lat, lon) {
        const currentWeatherUrl = this.getCurrentWeatherUrl(lat, lon, unitType, lang);
        // const resp = await fetch(currentWeatherUrl);

        return fetch(currentWeatherUrl).then(resp => resp.json());
        // return await resp.json();
    }

    getForecast(lat, lon, unitType, mode) {
        // async getForecast(lat, lon) {
        const forecastUrl = this.getForecastUrl(lat, lon, unitType, mode);
        // const resp = await fetch(forecastUrl);

        return fetch(forecastUrl).then(resp => resp.json());
        // return await resp.json();
    }

    clearCurrentDay(e) {
        e[0].value = '';
        // e.reset();
        // this.$forecastDetails.classList.add('d-none');
    }

    onFormSubmit(e) {
        /*
            Supported Forecast Suffix Types:
            • Standard
                • Kelvin
                • Meters per Second
            • Imperial
                • Fahrenheit
                • Miles per Hour
            • Metric
                • Celsius
                • Meters per Second

            Notes:
            • Manually convert mathematically.
                • Server-side (faster) versus client-side (local access for without internet).
            • Minimum & maximum ZIP code numbers:
                • Min = 00501
                • Min = 99950
        */

        e.preventDefault();

        const form = e.target;
        const data = new FormData(form);
        const zipCode = data.get('zipCode');
        const locale = 'US';
        // const unitType = 'kelvin';
        const unitType = 'imperial';
        // const unitType = 'metric';
        const lang = 'en';
        const mode = 'json';
        const precision = 1;

        this.getCoordinates(zipCode, locale)
            .then(loc => {
                const cData = this.getCurrentWeather(loc.lat, loc.lon, unitType, lang);
                const fData = this.getForecast(loc.lat, loc.lon, unitType, mode);

                return Promise.all([cData, fData]);
            })
            .then(struct => {
                const [current, forecast] = struct;
                const city = current.name;
                const currentWeatherSample = Sample.fromJson(current);
                const icon = currentWeatherSample.getIconUrl('large');
                const temp = currentWeatherSample.getTemp();
                const description = currentWeatherSample.getDescription();
                const wF = new WeatherForecast(forecast);
                const formattedTemp = wF.getTemperatureWithUnitType(temp, unitType, precision);
                const todaysForecast = wF.getToday();
                const $forecast = document.querySelector('#forecast');
                const root = View.createRoot($forecast);

                // $forecast.classList.remove('hidden');

                root.render(<Forecast weatherForecast={wF} unitType={unitType} precision={precision} city={city} icon={icon} temp={formattedTemp} description={description} current={currentWeatherSample} future={todaysForecast.getSamples()} />);
            })
            .then(() => this.clearCurrentDay(e.target));
    }

    render() {
        const defaultFormValue = true ? '97330' : '';

        return (
            <div class='flex flex-col gap-4 lg:w-1/2 font-black text-black m-4 lg:m-0'>
                <form class='flex rounded-lg border-2 border-black/50' onsubmit={this.onFormSubmit.bind(this)}>
                    <input
                        class='w-full rounded-l-lg placeholder-[rgba(0,0,0,0.25)] border-r-2 border-black/50 p-4'
                        name='zipCode'
                        placeholder='Enter a zip code'
                        value={defaultFormValue}
                        required
                    />
                    <button
                        class='rounded-r-lg bg-green-300 text-nowrap p-4'
                        type='submit'
                    >
                        GET FORECAST
                    </button>
                </form>
                <div
                    id='forecast'
                    class='flex flex-col gap-4 text-center text-white'
                ></div>
            </div >
        );
    }
}
