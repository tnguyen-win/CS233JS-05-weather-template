export default function getTemperatureWithSuffix(value, type) {
    return type === 'Imperial' ? value + ' &deg;F' : type === 'Metric' ? value + ' &deg;C' : ' [Unknown Type]';
}
