/* jshint esversion: 6 */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.scss';
import Controller from './controller.js';

var controller;

window.onload = () => controller = new Controller();
window.Controller = controller;
