/** @jsx vNode */
/* eslint-disable-next-line */
import { vNode } from '@ocdla/view';

export default function CurrentWeather({ city, icon, temp, description }) {
    return (
        <div class='flex flex-col items-center justify-center gap-4 rounded-lg bg-sky-700/20 border-[3px] border-white p-8'>
            <h1 class='text-6xl'>{city}</h1>
            <img
                src={icon}
                alt={'Forecast status icon.'}
                width={128}
                height={128}
            />
            <div class='flex justify-center items-center gap-4 font-light text-3xl'>
                <h3>{description}</h3>
                <div class='font-thin'>&nbsp;|&nbsp;</div>
                <h3>{temp}</h3>
            </div>
        </div>
    );
}
