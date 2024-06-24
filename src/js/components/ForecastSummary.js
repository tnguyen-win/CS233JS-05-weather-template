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

    // #2 | Assign event handlers.

    // assignEventHandlers($weatherItems, $forecastDetails) {
    //     for (let i in $weatherItems) if ($weatherItems[i].tagName === 'DIV') {
    //         $weatherItems[i].onclick = () => {
    //             $forecastDetails.innerHTML = ForecastDetails(this.forecast, i, this.city);
    //             $forecastDetails.classList.remove('d-none');
    //         };
    //     }
    // }

    render($forecastDetails) {
        // #1 | Assign event handlers.
        document.onclick = e => {
            const summary = e.target.parentElement;
            const dataType = 'data-index';

            if (summary.hasAttribute(dataType)) {
                $forecastDetails.innerHTML = ForecastDetails(this.forecast, summary.getAttribute(dataType), this.city);
                $forecastDetails.classList.remove('d-none');
            }
        };

        // #1 + #2 | Assign event handlers.

        return this.forecast.map((day, i) => DayForecastSummary(day, i)).join('\n');
    };
}
