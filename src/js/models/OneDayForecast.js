export default class OneDayForecast {
    constructor(samples) {
        const MIDNIGHT = getIndexOfMidnight(forecast[0].dt, timezoneOffset);
        const SIX_AM = 2;
        const NOON = 4;
        const SIX_PM = 6;
        const NINE_PM = 7;

        const MORNING = SIXAM;
        const DAY = NOON;
        const EVENING = SIXPM;
        const NIGHT = NINEPM;

        this.dt = new Date(forecast[NOON].dt * 1000);
        this.temp = forecast[NOON].main.temp;
        this.minTemp = OneDayForecast.findMinTemp(samples);
        this.maxTemp = OneDayForecast.findMaxTemp(samples);
        this.morningTemp = forecast[MORNING].main.temp;
        this.dayTemp = forecast[DAY].main.temp;
        this.eveningTemp = forecast[EVENING].main.temp;
        this.nightTemp = forecast[NIGHT].main.temp;
        this.description = forecast[NOON].weather[0].description;
        this.icon = forecast[NOON].weather[0].icon;
        this.pressure = forecast[NOON].main.pressure;
        this.wind = forecast[NOON].wind.speed;
        this.humidity = forecast[NOON].main.humidity;
    }

    getLow() {
        let min = forecast[indexOfMidnight].main.temp_min;

        for (let i = indexOfMidnight + 1; i < indexOfMidnight + 8; i++) if (forecast[i].main.temp_min < min) min = forecast[i].main.temp_min;

        return min;
    }

    getHigh() {
        let max = forecast[indexOfMidnight].main.temp_max;

        for (let i = indexOfMidnight + 1; i < indexOfMidnight + 8; i++) if (forecast[i].main.temp_max > max) max = forecast[i].main.temp_max;

        return max;
    }
}
