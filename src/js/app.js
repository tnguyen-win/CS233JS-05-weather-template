import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.scss';
// import '../css/output.css';
import Controller from './controller';

var controller;

window.onload = () => controller = new Controller();
window.Controller = controller;
