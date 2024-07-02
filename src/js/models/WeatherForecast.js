/** @jsx vNode */
/* eslint-disable-next-line */
import { vNode } from '@ocdla/view/view';
import OneDayForecast from './OneDayForecast';

export default class WeatherForecast {
    constructor(data) {
        this.dailyForecasts = this.parse(data);
    }

    getIndexOfMidnight(firstDate) {
        let dt = firstDate * 1000;
        let date = new Date(dt);
        let localHours = date.getHours();
        let firstMidnightIndex = localHours > 2 ? Math.round((24 - localHours) / 3) : Math.abs(Math.round(localHours / 3));

        return firstMidnightIndex;
    }

    parse(data) {
        const DAILY_SAMPLES = 8;
        const days = [];

        // const array1 = [5, 12, 50, 130, 44];
        // const isLargeNumber = (element) => element > 45;
        // console.log(array1.findLastIndex(isLargeNumber));



        const today = new Date();
        const lastIndex = data.findLastIndex(obj => {
            let day = new Date(obj.dt * 1000);

            return day.getDay() === today.getDay();
        });

        days.push(data.splice(0, lastIndex));

        const NUM_DAYS = Math.ceil(data.length / DAILY_SAMPLES);

        for (let group = 1; group <= NUM_DAYS; group++) {
            let samples = data.splice(0, DAILY_SAMPLES);

            days.push(samples);
        }

        return days.map(day => new OneDayForecast(day));
        // Return grouped samples for a given day.
    }

    getDailyForecasts() {
        return this.dailyForecasts;
    }

    getTemperatureWithUnitType(value, unitType) {
        // OCDLA JSX

        // return (
        //     <div>
        //         {unitType === 'Imperial' ? Math.round(value) + <div>&deg; F</div> : unitType === 'Metric' ? Math.round(value) + '&deg; C' : ' [Unknown Type]'}
        //     </div>
        // );

        // Vanilla JS

        return unitType === 'Imperial' ? Math.round(value) + '&deg; F' : unitType === 'Metric' ? Math.round(value) + '&deg; C' : ' [Unknown Type]';
    }

    getWindSpeedWithUnitType(value, unitType) {
        return unitType === 'Imperial' ? value + ' mph' : unitType === 'Metric' ? value + ' mps' : ' [Unknown Type]';
    }
}
