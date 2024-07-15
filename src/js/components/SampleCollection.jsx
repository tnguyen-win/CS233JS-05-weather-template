/** @jsx vNode */
/* eslint-disable-next-line */
import { vNode } from '@ocdla/view';
import Sample from './Sample';
/* eslint-enable */
import WeatherForecast from '../models/WeatherForecast';

export default function SampleCollection({ unitType, precision, future }) {
    const jsxSamples = future.map(sample => {
        const formattedTemp = WeatherForecast.getTemperatureWithUnitType(
            sample.getTemp(),
            unitType,
            precision
        );

        return (
            <Sample
                icon={sample.getIconUrl()}
                temp={formattedTemp}
                time={sample.getTime()}
            />
        );
    });

    return (
        <div class='flex flex-col lg:flex-row items-center justify-center gap-4'>
            {jsxSamples}
        </div>
    );
}
