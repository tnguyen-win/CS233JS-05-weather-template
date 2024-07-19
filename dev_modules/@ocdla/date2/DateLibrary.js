export default class DateLibrary {
    static dayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    // no static --> new DateLibrary();

    // static --> DateLibrary.getDate();

    static getDate(unixTimestamp, timezoneOffset) {
        return new Date((unixTimestamp - timezoneOffset) * 1000);
    }

    static getWeekday(date) {
        return DateLibrary.dayNames[date.getDay()];
    }

    static toHours(num) {
        return num / 3600;
    }

    static zeroPad(num) {
        const sign = Math.sign(num);
        const nextStep =
            Math.abs(num) < 10 ? '0' + Math.abs(num) : Math.abs(num);
        const str = nextStep.toString();

        return sign === -1 ? '-' + str : str;
    }

    static getOptions(timezoneOffsetInSeconds) {
        const options = { hour: 'numeric' };
        const hoursOffset = DateLibrary.toHours(timezoneOffsetInSeconds);
        const utcHours = DateLibrary.zeroPad(hoursOffset);

        options.timeZone = utcHours;

        return options;
    }

    static toLocaleDateParts(unixTimestamp, timezoneOffsetInSeconds, locale) {
        const date = new Date(unixTimestamp * 1000);
        const options = DateLibrary.getOptions(timezoneOffsetInSeconds);
        let dateParts = [];

        dateParts = [
            date.toLocaleDateString(locale, options),
            date.toLocaleTimeString(locale, options),
            date.toLocaleString('default', { month: 'long' }) +
                ' ' +
                date.toLocaleString('default', { day: '2-digit' })
        ];

        return dateParts;
    }
}
