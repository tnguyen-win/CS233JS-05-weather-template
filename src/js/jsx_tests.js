/** @jsx vNode */
import { vNode, View } from '../../node_modules/@ocdla/view/view';
import { JSX_Component } from './components/JSX_Component';

export default class JSX_Tests {
    constructor() {
        this.body = document.querySelector('body');
        this.root = View.createRoot(this.body);

        // this.root = View.createRoot('#html');

        this.root.render(
            <JSX_Component
                classes='rounded-5 p-4'
                styles={{
                    width: 'max-content',
                    color: 'red'
                }}
                body='Hello World'
            />
        );
    }
}