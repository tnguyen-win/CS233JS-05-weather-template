/** @jsx vNode */
import { vNode } from '../../../node_modules/@ocdla/view/view';

export const JSX_Component = ({ classes, styles, body }) => {
    const inlineStyles = Object.keys(styles || {}).map(key => `${key}: ${styles[key]};`).join(' ');

    return (
        <h1 class={classes} style={inlineStyles}>
            {body}
        </h1>
    );
};
