export default class OneDayForecast {
    constructor(samples) {
        const SIX_AM = 2;
        const NOON = 4;
        const SIX_PM = 6;
        const NINE_PM = 7;
        const MORNING = SIX_AM;
        const DAY = NOON;
        const EVENING = SIX_PM;
        const NIGHT = NINE_PM;

        this.dt = new Date(samples[NOON].dt * 1000);
        this.temp = samples[NOON].main.temp;
        this.minTemp = this.getLow(samples);
        this.maxTemp = this.getHigh(samples);
        this.morningTemp = samples[MORNING].main.temp;
        this.dayTemp = samples[DAY].main.temp;
        this.eveningTemp = samples[EVENING].main.temp;
        this.nightTemp = samples[NIGHT].main.temp;
        this.description = samples[NOON].weather[0].description;
        this.icon = samples[NOON].weather[0].icon;
        this.pressure = samples[NOON].main.pressure;
        this.wind = samples[NOON].wind.speed;
        this.humidity = samples[NOON].main.humidity;
    }

    getLow(forecast) {
        let min = forecast[0].main.temp_min;

        for (let i = 1; i < forecast.length; i++) if (forecast[i].main.temp_min < min) min = forecast[i].main.temp_min;

        return min;
    }

    getHigh(forecast) {
        let max = forecast[0].main.temp_max;

        for (let i = 1; i < forecast.length; i++) if (forecast[i].main.temp_max > max) max = forecast[i].main.temp_max;

        return max;
    }

    getDay() {
        return this.dt;
    }

    getIndexOfMidnight(firstDate) {
        let dt = firstDate * 1000;
        let date = new Date(dt);
        let localHours = date.getHours();
        let firstMidnightIndex = localHours > 2 ? Math.round((24 - localHours) / 3) : Math.abs(Math.round(localHours / 3));

        return firstMidnightIndex;
    }
}
