import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.scss';
// import '../css/input.css';
import Controller from './controller';
// import JSX_Tests from './jsx_tests';

var controller;
// var jsx_tests;

window.onload = () => new Controller();
window.Controller = controller;

// window.onload = () => jsx_tests = new JSX_Tests();
// window.JSX_Tests = jsx_tests;
