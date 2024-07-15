/** @jsx vNode */
/* eslint-disable-next-line */
import { vNode } from '@ocdla/view';

export default function Summary({ month, date, day, tempMin, tempMax, index }) {
    return (
        <div
            class='flex flex-col items-center justify-center gap-4 rounded-lg bg-sky-700/20 font-light text-xl border-[3px] border-white p-4'
            data-index={index}>
            <h6>
                <div>
                    {month} / {date}
                </div>
            </h6>
            <h6 class='font-bold text-3xl'>{day}</h6>
            <h6 class='break-all'>
                {tempMin} | {tempMax}
            </h6>
        </div>
    );
}
