/** @jsx vNode */
/* eslint-disable-next-line */
import { vNode } from '@ocdla/view';

export default function Summary({ month, date, day, tempMin, tempMax, index }) {
    return (
        <div
            class='flex flex-col items-center justify-center gap-4 rounded-lg bg-sky-700/20 font-bold border-4 border-white p-4'
            data-index={index}>
            <h2>
                <div>
                    {month} / {date}
                </div>
            </h2>
            <h3>{day}</h3>
            <h3 class='break-all'>
                {tempMin} | {tempMax}
            </h3>
        </div>
    );
}
