import { DayForecastSummary } from '../view';

export default class ForecastSummary {
    // constructor($weatherList, forecast, $forecastDetails, city) {
    constructor(forecast, city) {
        // Accepts forecast.
        // parseForecast(data.list, data.city.timezone)
        this.forecast = forecast;
        this.city = city;
    }

    render() {
        let html = this.forecast.map((day, i) => {
            return DayForecastSummary(day, i);
        });

        return html.join('\n');

        /*
            Don't write inline event handlers. Use event delegation.
            Can use HTML data attributes.
            Read the element that was clicked via passed with **e.target.dataset.index**.
        */

        // for (let i in $weatherItems) {
        //     if ($weatherItems[i].tagName === 'DIV') {
        //         $weatherItems[i].onclick = () => {
        //             $forecastDetails.classList.remove('d-none');
        //             $forecastDetails.innerHTML = ForecastDetails(forecast, i, city);
        //         }
        //     }
        // }
    };
}
