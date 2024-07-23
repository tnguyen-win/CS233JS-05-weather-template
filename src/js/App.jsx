import 'toastr/build/toastr.min.css';
import toastr from 'toastr/build/toastr.min.js';
/** @jsx vNode */
/* eslint-disable no-unused-vars */
import { vNode, View } from '@ocdla/view';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecasts from './components/HourlyForecasts';
import DailyForecasts from './components/DailyForecasts';
/* eslint-enable */
import Sample from './models/Sample';
import US_States from './data/us_states.json';
import WeatherForecast from './models/WeatherForecast';

export default class App {
    static OPEN_WEATHER_MAP_DOMAIN = 'api.openweathermap.org';
    static GEOCODE_VERSION = '1.0';
    static FORECAST_VERSION = '2.5';
    static GEOCODE_ENDPOINT = 'geo/' + App.GEOCODE_VERSION + '/zip';
    static STATE_ENDPOINT = 'geo/' + App.GEOCODE_VERSION + '/direct';
    static CURRENT_WEATHER_ENDPOINT =
        'data/' + App.FORECAST_VERSION + '/weather';
    static FORECAST_ENDPOINT = 'data/' + App.FORECAST_VERSION + '/forecast';
    static API_KEY = process.env.API_KEY;

    constructor() {
        this.apiKey = App.API_KEY;

        setTimeout(() => {
            if (this.apiKey) {
                toastr.options.closeButton = true;
                toastr.success('API key was found.');
            } else {
                toastr.options.timeOut = 0;
                toastr.options.extendedTimeOut = 0;
                toastr.error(
                    `
                    <span>
                        API key is missing.
                    </span>
                    <br class='mb-1' />
                    View README.md for more
                    instructions.
                    `
                );
            }
        });

        // setTimeout(() => toastr.error('Test.'));
    }

    getGeocodeUrl(zipCode, country) {
        return (
            'https://' +
            App.OPEN_WEATHER_MAP_DOMAIN +
            '/' +
            App.GEOCODE_ENDPOINT +
            '?zip=' +
            zipCode +
            ',' +
            country +
            '&appid=' +
            this.apiKey
        );
    }

    getCoordinates(zipCode, country) {
        const geocodeUrl = this.getGeocodeUrl(zipCode, country);
        const json = fetch(geocodeUrl).then(resp => resp.json());

        // Inspect JSON to determine if the status code isn't okay.
        // Use resp.ok !== true

        return json;
        // return await resp.json();
    }

    getStateUrl(city) {
        return (
            'https://' +
            App.OPEN_WEATHER_MAP_DOMAIN +
            '/' +
            App.STATE_ENDPOINT +
            '?q=' +
            city +
            '&appid=' +
            this.apiKey
        );
    }

    async getState(city) {
        const stateUrl = this.getStateUrl(city);
        const resp = await fetch(stateUrl);

        return await resp.json();
    }

    getCurrentWeatherUrl(lat, lon, unitType, lang) {
        return (
            'https://' +
            App.OPEN_WEATHER_MAP_DOMAIN +
            '/' +
            App.CURRENT_WEATHER_ENDPOINT +
            '?units=' +
            unitType +
            '&lat=' +
            lat +
            '&lon=' +
            lon +
            '&lang=' +
            lang +
            '&appid=' +
            this.apiKey
        );
    }

    async getCurrentWeather(lat, lon, unitType, lang) {
        const currentWeatherUrl = this.getCurrentWeatherUrl(
            lat,
            lon,
            unitType,
            lang
        );
        const resp = await fetch(currentWeatherUrl);

        return await resp.json();
    }

    // addParam()
    // toString()

    getForecastUrl(lat, lon, unitType, mode) {
        return (
            'https://' +
            App.OPEN_WEATHER_MAP_DOMAIN +
            '/' +
            App.FORECAST_ENDPOINT +
            '?units=' +
            unitType +
            '&lat=' +
            lat +
            '&lon=' +
            lon +
            '&mode=' +
            mode +
            '&appid=' +
            this.apiKey
        );
    }

    async getForecast(lat, lon, unitType, mode) {
        const forecastUrl = this.getForecastUrl(lat, lon, unitType, mode);
        const resp = await fetch(forecastUrl);

        return await resp.json();
    }

    clearCurrentDay(e) {
        e[0].value = '';
        // e.reset();
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
        const precision = 0;

        this.getCoordinates(zipCode, locale)
            .then(loc => {
                // .then(async () => {
                //     const pos = await new Promise((resolve, reject) =>
                //         navigator.geolocation.getCurrentPosition(resolve, reject)
                //     );

                const cData = this.getCurrentWeather(
                    loc.lat,
                    loc.lon,
                    // pos.latitude,
                    // pos.longitude,
                    unitType,
                    lang
                );
                const fData = this.getForecast(
                    loc.lat,
                    loc.lon,
                    // pos.latitude,
                    // pos.longitude,
                    unitType,
                    mode
                );

                return Promise.all([cData, fData]);
            })
            .then(struct => {
                const [current, forecast] = struct;
                const state = this.getState(forecast.city.name);

                return Promise.all([current, state, forecast]);
            })
            .then(struct => {
                const [current, state, forecast] = struct;
                const city = current.name;
                const formattedState = state[0].state
                    ? ', ' +
                      US_States.find(pair => pair[0] === state[0].state)[1]
                    : '';
                const wf = new WeatherForecast(forecast);
                const currentWeatherSample = Sample.fromJson(current);
                const formattedIconUrl =
                    currentWeatherSample.getIconUrl('large');
                const temp = currentWeatherSample.getTemp();
                const description = currentWeatherSample.getDescription();
                const formattedDate =
                    wf.toLocaleMonthAndDay(currentWeatherSample);
                const formattedTemp = wf.getTemperatureWithUnitType(
                    temp,
                    unitType,
                    precision
                );
                const samples = wf.getNextSamples(5);
                const $forecast = document.querySelector('#forecast');
                const root = View.createRoot($forecast);

                root.render(
                    <div class='flex flex-col gap-4'>
                        <CurrentWeather
                            city={city}
                            state={formattedState}
                            date={formattedDate}
                            icon={formattedIconUrl}
                            temp={formattedTemp}
                            description={description}
                        />
                        <HourlyForecasts
                            unitType={unitType}
                            precision={precision}
                            samples={samples}
                            wf={wf}
                        />
                        <DailyForecasts
                            unitType={unitType}
                            precision={precision}
                            summaries={forecast.list}
                            wf={wf}
                        />
                    </div>
                );
            })
            .then(() => this.clearCurrentDay(e.target))
            /* eslint-disable-next-line no-console */
            .catch(e => console.log(e));
    }

    render() {
        const defaultFormValue = true ? '97330' : '';

        return (
            <div class='flex flex-col gap-4 lg:w-1/2 text-black m-4 lg:my-10'>
                <form
                    class='group flex rounded-lg border-[1px] border-black/20 focus-within:border-black'
                    onsubmit={this.onFormSubmit.bind(this)}>
                    <input
                        class='group-focus-within:outline-none w-full rounded-l-lg placeholder-black/25 border-r-[1px] border-black/20 group-focus-within:border-r-black p-4'
                        name='zipCode'
                        placeholder='Enter a zip code'
                        value={defaultFormValue}
                        required
                    />
                    <button
                        class='rounded-r-lg bg-green-300 text-nowrap p-4'
                        type='submit'>
                        GET FORECAST
                    </button>
                </form>
                <div
                    id='forecast'
                    class='flex flex-col gap-4 text-center text-white'></div>
            </div>
        );
    }
}
