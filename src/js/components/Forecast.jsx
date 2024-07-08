/** @jsx vNode */
/* eslint-disable */
import { vNode } from '@ocdla/view';
import Sample from './Sample';
/* eslint-enable */

{/* <div>
    <CurrentWeather current />
    <SampleCollection future />
    <DailyForecasts summaries />
</div> */}

export default function Forecast({ weatherForecast, unitType, precision, city, icon, temp, description, future }) {
    // let summaries = props.summaries;
    let jsxArray = future.map(sample => {
        const formattedTemp = weatherForecast.getTemperatureWithUnitType(sample.getTemp(), unitType, precision);

        return <Sample icon={sample.getIconUrl()} temp={formattedTemp} time={sample.getTime()} />
    });

    return (
        <div class='flex flex-col gap-4'>
            <div class='flex flex-col items-center justify-center gap-4 rounded-lg bg-sky-700/20 border-4 border-white p-8'>
                <h1 class='text-6xl'>
                    {city}
                </h1>
                <img src={icon} alt={'Forecast status icon.'} width={128} height={128} />
                <h3 class='text-3xl'>
                    {temp}
                </h3>
                <h3 class='text-3xl'>
                    {description}
                </h3>
            </div>
            <div class='flex flex-col lg:flex-row items-center justify-center gap-4'>
                {jsxArray}
            </div>
        </div>
    );
};
