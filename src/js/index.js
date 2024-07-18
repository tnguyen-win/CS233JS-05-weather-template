import '../css/input.css';
/** @jsx vNode */
/* eslint-disable */
import { vNode, View } from '@ocdla/view';
// import JSX_Tests from './JSX_Tests';
import App from './App';
/* eslint-enable */

const $body = document.querySelector('body');
const root = View.createRoot($body);
// const root = View.createRoot('#root');

// JSX Tests

// root.render(<JSX_Tests />);

// Weather Application

root.render(<App />);
