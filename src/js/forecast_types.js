export default function getTemperatureWithSuffix(value, type) {
    return type === 'Imperial' ? Math.round(value) + '&deg; F' : type === 'Metric' ? Math.round(value) + '&deg; C' : ' [Unknown Type]';
}
