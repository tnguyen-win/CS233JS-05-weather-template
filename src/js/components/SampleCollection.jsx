/** @jsx vNode */
/* eslint-disable-next-line */
import { vNode } from '@ocdla/view';
import Sample from './Sample';
/* eslint-enable */
import WeatherForecast from '../models/WeatherForecast';

export default function SampleCollection({ unitType, precision, samples, wf }) {
    const jsxSamples = samples.map(sample => {
        const formattedTemp = WeatherForecast.getTemperatureWithUnitType(
            sample.getTemp(),
            unitType,
            precision
        );
        const time = wf.toLocaleTime(sample);

        return (
            <Sample
                icon={sample.getIconUrl()}
                temp={formattedTemp}
                time={time}
            />
        );
    });

    return (
        <div class='flex flex-col lg:flex-row items-center justify-center gap-4'>
            {jsxSamples}
        </div>
    );
}
