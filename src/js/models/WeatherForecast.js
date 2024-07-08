import OneDayForecast from './OneDayForecast';
import Sample from './Sample';

export default class WeatherForecast {
    constructor(data) {
        this.dailyForecasts = this.parse(data.list);

        Object.assign(this, ({ data }));
    }

    parse(data) {
        let days = [];
        const groupByDayFn = ({ dt }) => {
            const d = new Date(dt * 1000);
            const m = d.getMonth() + 1;
            const day = d.getDate();
            const y = d.getFullYear();
            const key = y + '-' + m + '-' + day;

            return key;
        };
        let samples = Sample.collectionFromJson(data);
        const sequence = Object.groupBy(samples, groupByDayFn);
        const groups = Object.values(sequence);

        for (let group of groups) {
            let day = new OneDayForecast(group);

            days.push(day);
        }

        return days;
    }

    getToday() {
        return this.dailyForecasts[0];
    }

    getDay(dayIndex) {
        return this.dailyForecasts[dayIndex];
    }

    getDailyForecasts() {
        return this.dailyForecasts;
    }

    getTemperatureWithUnitType(value, unitType, precision) {
        var precisionMultiplier = Math.pow(10, precision || 0);
        var roundedValue = Math.round(value * precisionMultiplier) / precisionMultiplier;

        switch (unitType) {
            case 'kelvin':
                return roundedValue + ' (K)';
            case 'imperial':
            case 'metric':
                return roundedValue + ' (' + String.fromCharCode(176) + (unitType === 'imperial' ? 'F)' : ' C)');
            default:
                return '[Unknown Type]';
        }
    }

    getWindSpeedWithUnitType(value, unitType) {
        return unitType === 'imperial' ? value + ' mph' : unitType === 'metric' ? value + ' mps' : ' [Unknown Type]';
    }
}
