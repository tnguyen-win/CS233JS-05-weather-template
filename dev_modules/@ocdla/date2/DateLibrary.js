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
    let sign = Math.sign(num);
    let nextStep = Math.abs(num) < 10 ? '0' + Math.abs(num) : Math.abs(num);
    let str = nextStep.toString();

    return sign === -1 ? '-' + str : str;
}

export function toString(unixTimestamp, timezoneOffsetInSeconds, locale) {
    let date = new Date(unixTimestamp * 1000);
    let options = {};
    let hoursOffset = toHours(timezoneOffsetInSeconds);
    let utcHours = zeroPad(hoursOffset);

    options.timeZone = utcHours;

    return date.toLocaleString(locale, options);

    // const hours = date.getHours();
    // const minutes = date.getMinutes();
    // const seconds = date.getSeconds();
    // const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    // const ampm = hours >= 12 ? 'PM' : 'AM';
    // const timeString =
    //     formattedHours + ':' + minutes + ':' + seconds + ' ' + ampm;

    // return timeString;
}

// function parse(str) {
//     return str.split();
// }

function getOptions(timezoneOffsetInSeconds) {
    let options = {};
    let hoursOffset = toHours(timezoneOffsetInSeconds);
    let utcHours = zeroPad(hoursOffset);
    options.timeZone = utcHours;
    return options;
}

export function toLocaleDateParts(
    unixTimestamp,
    timezoneOffsetInSeconds,
    locale
) {
    let date = new Date(unixTimestamp * 1000);
    let options = getOptions(timezoneOffsetInSeconds);

    let dateParts = new Array();

    dateParts[0] = date.toLocaleDateString(locale, options);
    dateParts[1] = date.toLocaleTimeString(locale, options);

    return dateParts;
}
