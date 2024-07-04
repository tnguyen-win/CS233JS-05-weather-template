import OneDayForecast from './OneDayForecast';
import Sample from './Sample';

export default class WeatherForecast {
    constructor(data) {
        this.data = data;
        this.dailyForecasts = this.parse(data.list);
    }

    parse(data) {
        let days = [];
        let groupByDayFn = ({ dt }) => {
            let d = new Date(dt * 1000);
            let m = d.getMonth() + 1;
            let day = d.getDate();
            let y = d.getFullYear();
            let key = y + '-' + m + '-' + day;

            return key;
        };
        let samples = Sample.collectionFromJson(data);
        let sequence = Object.groupBy(samples, groupByDayFn);

        for (let group of sequence) {
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

    getTemperatureWithUnitType(value, unitType) {
        return unitType === 'Imperial' ? Math.round(value) + '&deg; F' : unitType === 'Metric' ? Math.round(value) + '&deg; C' : ' [Unknown Type]';
    }

    getWindSpeedWithUnitType(value, unitType) {
        return unitType === 'Imperial' ? value + ' mph' : unitType === 'Metric' ? value + ' mps' : ' [Unknown Type]';
    }
}
