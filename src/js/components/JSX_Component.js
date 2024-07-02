/** @jsx vNode */
/* eslint-disable-next-line */
import { vNode } from '@ocdla/view/view';

export default function JSX_Component({ classes, styles, body }) {
    const inlineStyles = Object.keys(styles || {}).map(key => `${key}: ${styles[key]};`).join(' ');

    return (
        <h1 class={classes} style={inlineStyles}>
            {body}
        </h1>
    );
};
