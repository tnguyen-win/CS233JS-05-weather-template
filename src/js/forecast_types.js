export function getTemperatureWithUnitType(value, unitType) {
    return unitType === 'Imperial' ? Math.round(value) + '&deg; F' : unitType === 'Metric' ? Math.round(value) + '&deg; C' : ' [Unknown Type]';
}

export function getWindSpeedWithUnitType(value, unitType) {
    return unitType === 'Imperial' ? value + ' mph' : unitType === 'Metric' ? value + ' mps' : ' [Unknown Type]';
}
