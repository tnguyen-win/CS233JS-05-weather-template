/** @jsx vNode */
/* eslint-disable-next-line */
import { vNode } from '@ocdla/view';

export default function Sample({ icon, temp, time }) {
    return (
        <div class='flex flex-col items-center justify-center gap-4 rounded-lg bg-sky-700/20 font-bold border-[3px] border-white p-4'>
            <img
                src={icon}
                alt={'Forecast status icon.'}
                width={64}
                height={64}
            />
            <div class='flex flex-col justify-center items-center gap-4 text-xl'>
                <h6>{temp}</h6>
                <h6 class='font-light'>{time}</h6>
            </div>
        </div>
    );
}
