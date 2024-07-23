/** @jsx vNode */
/* eslint-disable no-unused-vars */
import { vNode } from '@ocdla/view';
import Summary from './Summary';
/* eslint-enable */
import DateLibrary from '@ocdla/date2';

export default function DailyForecasts({ unitType, precision, summaries, wf }) {
    const jsxSummaries = summaries.map((summary, i) => {
        const dt = new Date(summary.dt * 1000);
        const month = dt.getMonth() + 1;
        const date = dt.getDate();
        const day = DateLibrary.getWeekday(dt);
        const tempMin = wf.getTemperatureWithUnitType(
            summary.main.temp_min,
            unitType,
            precision
        );
        const tempMax = wf.getTemperatureWithUnitType(
            summary.main.temp_max,
            unitType,
            precision
        );

        return (
            <Summary
                month={month}
                date={date}
                day={day}
                tempMin={tempMin}
                tempMax={tempMax}
                index={i}
            />
        );
    });

    return (
        <div class='grid grid-cols-1 lg:grid-cols-3 items-center justify-center gap-4 items-center justify-center gap-4'>
            {jsxSummaries}
        </div>
    );
}
