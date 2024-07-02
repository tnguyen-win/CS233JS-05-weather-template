/** @jsx vNode */
/* eslint-disable */
import { vNode, View } from '@ocdla/view/view';
import JSX_Component from './components/JSX_Component';
/* eslint-enable */

export default class JSX_Tests {
    constructor() {
        this.body = document.querySelector('body');
        this.root = View.createRoot(this.body);

        // this.root = View.createRoot('#html');

        this.root.render(
            <JSX_Component
                classes='rounded-5 bg-black p-4'
                styles={{
                    width: 'max-content',
                    color: 'red'
                }}
                body='Hello World'
            />
        );
    }
}
