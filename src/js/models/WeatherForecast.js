import OneDayForecast from './OneDayForecast';

export default class WeatherForecast {
    constructor(data) {
        this.dailyForecasts = this.parse(data);
    }

    parse(data) {
        const DAILY_SAMPLES = 8;
        const days = [];
        const NUM_DAYS = data.length / DAILY_SAMPLES;

        for (let group = 1; group <= NUM_DAYS; group++) {
            let samples = data.splice(0, DAILY_SAMPLES);

            days.push(samples);
        }

        return days.map(day => new OneDayForecast(day));
    }

    getDailyForecasts() {
        return this.dailyForecasts;
    }

    getTemperatureWithUnitType(value, unitType) {
        return unitType === 'Imperial' ? Math.round(value) + '&deg; F' : unitType === 'Metric' ? Math.round(value) + '&deg; C' : ' [Unknown Type]';
    }

    getWindSpeedWithUnitType(value, unitType) {
        return unitType === 'Imperial' ? value + ' mph' : unitType === 'Metric' ? value + ' mps' : ' [Unknown Type]';
    }
}
