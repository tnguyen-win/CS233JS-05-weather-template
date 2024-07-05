/** @jsx vNode */
/* eslint-disable-next-line */
import { vNode } from '@ocdla/view';

export default function Sample({ icon, temp, time }) {
    return (
        <div class='flex flex-col items-center justify-center gap-4 bg-neutral-900 border border-white/50 p-4'>
            <img src={icon} alt={'Forecast status icon.'} width={64} height={64} />
            <div>
                {temp}
            </div>
            <div>
                {time}
            </div>
        </div>
    );
}
