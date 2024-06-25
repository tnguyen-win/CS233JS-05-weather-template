import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.scss';
// import '../css/output.css';
import Controller from './controller.js';

var controller;

window.onload = () => controller = new Controller();
window.Controller = controller;
