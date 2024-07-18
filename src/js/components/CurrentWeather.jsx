/** @jsx vNode */
/* eslint-disable-next-line */
import { vNode } from '@ocdla/view';

export default function CurrentWeather({
    city,
    state,
    date,
    icon,
    temp,
    description
}) {
    return (
        <div class='flex flex-col items-center justify-center gap-4 rounded-lg bg-sky-700/20 border-[1px] border-slate-400/20 p-8'>
            <h1 class='text-6xl drop-shadow-md'>
                {city}
                {state}
            </h1>
            <h3 class='text-3xl'>{date}</h3>
            <img
                src={icon}
                alt={'Forecast status icon.'}
                width={128}
                height={128}
            />
            <div class='flex justify-center items-center gap-4 font-light text-3xl'>
                <h3>{description}</h3>
                <div class='font-thin'>|</div>
                <h3>{temp}</h3>
            </div>
        </div>
    );
}
