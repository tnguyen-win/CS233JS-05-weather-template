/** @jsx vNode */
/* eslint-disable-next-line */
import { vNode } from '@ocdla/view';

export default function CurrentWeather({ city, icon, temp, description }) {
    return (
        <div class='flex flex-col items-center justify-center gap-4 rounded-lg bg-sky-700/20 border-4 border-white p-8'>
            <h1 class='text-6xl'>{city}</h1>
            <img
                src={icon}
                alt={'Forecast status icon.'}
                width={128}
                height={128}
            />
            <h3 class='text-3xl'>{temp}</h3>
            <h3 class='text-3xl'>{description}</h3>
        </div>
    );
}
