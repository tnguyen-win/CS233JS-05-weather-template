export function getDate(unixTimestamp, timezoneOffset) {
    return new Date((unixTimestamp - timezoneOffset) * 1000);
}

export function getWeekday(date) {
    const dayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    return dayNames[date.getDay()];
}

function toHours(num) {
    return num / 3600;
}

function zeroPad(num) {
    const sign = Math.sign(num);
    const nextStep = Math.abs(num) < 10 ? '0' + Math.abs(num) : Math.abs(num);
    const str = nextStep.toString();

    return sign === -1 ? '-' + str : str;
}

function getOptions(timezoneOffsetInSeconds) {
    const options = {};
    const hoursOffset = toHours(timezoneOffsetInSeconds);
    const utcHours = zeroPad(hoursOffset);

    options.timeZone = utcHours;

    return options;
}

export function toLocaleDateParts(
    unixTimestamp,
    timezoneOffsetInSeconds,
    locale
) {
    const date = new Date(unixTimestamp * 1000);
    const options = getOptions(timezoneOffsetInSeconds);
    let dateParts = new Array();

    dateParts = [
        date.toLocaleDateString(locale, options),
        date.toLocaleTimeString(locale, options)
    ];

    return dateParts;
}
