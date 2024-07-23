/** @jsx vNode */
/* eslint-disable no-unused-vars */
import { vNode } from '@ocdla/view';
import JSX_Component from './components/JSX_Component';
/* eslint-enable */

export default function JSX_Tests() {
    return (
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
