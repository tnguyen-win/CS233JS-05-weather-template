import OneDayForecast from './OneDayForecast';
import Sample from './Sample';

export default class WeatherForecast {
    constructor(data) {
        this.dailyForecasts = this.parse(data.list);
        this.samples;

        Object.assign(this, { data });
    }

    parse(data) {
        const days = [];
        const groupByDayFn = ({ dt }) => {
            const d = new Date(dt * 1000);
            const m = d.getMonth() + 1;
            const day = d.getDate();
            const y = d.getFullYear();
            const key = y + '-' + m + '-' + day;

            return key;
        };

        this.samples = Sample.collectionFromJson(data);

        const sequence = Object.groupBy(this.samples, groupByDayFn);
        const groups = Object.values(sequence);

        for (const group of groups) {
            const day = new OneDayForecast(group);

            days.push(day);
        }

        return days;
    }

    // getToday() {
    getNextSamples(numSamples, startTime = new Date()) {
        // return this.dailyForecasts[0];
        // (0, 5)
        // array.findIndex()
        // 1000000

        const startIndex = this.samples.findIndex(
            ele => startTime.getTime() / 1000 <= ele.dt
        );

        return this.samples.slice(startIndex, numSamples);
    }

    getDay(dayIndex) {
        return this.dailyForecasts[dayIndex];
    }

    getDailyForecasts() {
        return this.dailyForecasts;
    }

    static getTemperatureWithUnitType(value, unitType, precision) {
        const precisionMultiplier = Math.pow(10, precision || 0);
        const roundedValue =
            Math.round(value * precisionMultiplier) / precisionMultiplier;
        let output = '[Unknown Type]';

        switch (unitType) {
            case 'kelvin':
                output = roundedValue + ' K';
                break;
            case 'imperial':
            case 'metric':
                output =
                    roundedValue +
                    String.fromCharCode(176) +
                    (unitType === 'imperial' ? ' F' : ' C');
                break;
        }

        return output;
    }

    static getWindSpeedWithUnitType(value, unitType) {
        return unitType === 'imperial'
            ? value + ' mph'
            : unitType === 'metric'
            ? value + ' mps'
            : ' [Unknown Type]';
    }
}
