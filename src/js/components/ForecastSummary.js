import { DayForecastSummary, ForecastDetails } from '../view';

export default class ForecastSummary {
    // constructor($weatherList, forecast, $forecastDetails, city) {
    constructor(forecast, city) {
        // Accepts forecast.
        // parseForecast(data.list, data.city.timezone)
        this.forecast = forecast;
        this.city = city;
    }

    /*
        Don't write inline event handlers. Use event delegation.
        Can use HTML data attributes.
        Read the element that was clicked via passed with **e.target.dataset.index**.
    */

    assignEventHandlers($forecastDetails) {
        const $weatherItems = document.getElementsByClassName('weather-list-item');

        for (let i in $weatherItems) if ($weatherItems[i].tagName === 'DIV') {
            $weatherItems[i].onclick = () => {
                $forecastDetails.innerHTML = ForecastDetails(this.forecast, i, this.city);
                $forecastDetails.classList.remove('d-none');
            };
        }
    }

    render = () => this.forecast.map((day, i) => DayForecastSummary(day, i)).join('\n');
}
