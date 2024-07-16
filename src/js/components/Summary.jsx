/** @jsx vNode */
/* eslint-disable-next-line */
import { vNode } from '@ocdla/view';

export default function Summary({ month, date, day, tempMin, tempMax, index }) {
    return (
        <div
            class='flex flex-col items-center justify-center gap-4 rounded-lg bg-sky-700/20 border-[1px] border-slate-400/20 p-4'
            data-index={index}>
            <h6>
                <div>
                    {month} / {date}
                </div>
            </h6>
            <h6 class='font-bold text-3xl drop-shadow'>{day}</h6>
            <h6 class='flex gap-4 break-all font-light text-xl'>
                <div>{tempMin}</div>
                <div class='font-thin'>|</div>
                <div>{tempMax}</div>
            </h6>
        </div>
    );
}
