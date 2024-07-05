/** @jsx vNode */ /** @jsxFrag 'Fragment' */
/* eslint-disable */
import { vNode } from '@ocdla/view';
import Sample from './Sample';
/* eslint-enable */

{/* <div>
    <CurrentWeather current />
    <SampleCollection future />
    <DailyForecasts summaries />
</div> */}

export default function Forecast({ city, icon, temp, description, future }) {
    // let summaries = props.summaries;
    let jsxArray = future.map(sample => <Sample icon={sample.getIconUrl()} temp={sample.getTemp()} time={sample.getTime()} />);

    return (
        <>
            <div class='flex flex-col items-center justify-center gap-4 bg-black border border-b-0 border-white/50 p-8'>
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
            <div class='flex flex-col lg:flex-row items-center justify-center'>
                {jsxArray}
            </div>
        </>
    );
};
