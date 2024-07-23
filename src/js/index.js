import '../css/input.css';
/** @jsx vNode */
/* eslint-disable no-unused-vars */
import { vNode, View } from '@ocdla/view';
import App from './App';
// import JSX_Tests from './JSX_Tests';
/* eslint-enable */
// import './sw';

const $body = document.querySelector('body');
const root = View.createRoot($body);
// const root = View.createRoot('#root');

root.render(<App />); // Weather Application
// root.render(<JSX_Tests />); // JSX Tests
