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
    future,
    summaries
}) {
    return (
        <div class='flex flex-col gap-4'>
            <CurrentWeather
                city={current.city}
                icon={current.icon}
                temp={current.temp}
                description={current.description}
            />
            <SampleCollection
                unitType={unitType}
                precision={precision}
                future={future}
            />
            <DailyForecasts
                unitType={unitType}
                precision={precision}
                summaries={summaries}
            />
        </div>
    );
}
