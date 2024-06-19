/* jshint esversion: 6 */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.scss';
import Weather from './weather.js';

var weather;

window.onload = () => weather = new Weather();
window.Weather = Weather;
