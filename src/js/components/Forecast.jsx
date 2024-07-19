/** @jsx vNode */
/* eslint-disable */
import { vNode } from '@ocdla/view';
import SampleCollection from './SampleCollection';
import CurrentWeather from './CurrentWeather';
import DailyForecasts from './DailyForecasts';
/* eslint-enable */

export default function Forecast({
    unitType,
    precision,
    current,
    state,
    future,
    summaries,
    offset
}) {
    return (
        <div class='flex flex-col gap-4'>
            <CurrentWeather
                city={current.city}
                state={state}
                date={current.date}
                icon={current.icon}
                temp={current.temp}
                description={current.description}
            />
            <SampleCollection
                unitType={unitType}
                precision={precision}
                samples={future}
                // wf={}
            />
            <DailyForecasts
                unitType={unitType}
                precision={precision}
                summaries={summaries}
            />
        </div>
    );
}
