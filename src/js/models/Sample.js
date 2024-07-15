export default class Sample {
    constructor(timestamp) {
        this.dt = timestamp;
        this.date = new Date(timestamp * 1000)
            .toLocaleString()
            .replace(', ', '\n');
        this.temp;
        this.wind;
        this.pressure;
        this.description;
        this.icon;
    }

    getTime() {
        return this.date + '';
    }

    getTemp() {
        return this.temp + '';
    }

    getIconUrl(size) {
        return (
            'https://openweathermap.org/img/wn/' +
            this.icon +
            (size === 'large' ? '@4x' : size === 'medium' ? '@2x' : '') +
            '.png'
        );
    }

    getDescription() {
        return this.description + '';
    }

    setTemp(temp) {
        this.temp = temp + '';
    }

    static fromJson(data) {
        const sample = new Sample(data.dt);

        sample.temp = data.main.temp;
        sample.wind = data.wind;
        sample.pressure = data.main.pressure;
        sample.humidity = data.main.humidity;
        sample.icon = data.weather[0].icon;
        sample.description = data.weather[0].description;

        return sample;
    }

    static collectionFromJson(json) {
        const samples = [];

        for (const i in json) samples.push(Sample.fromJson(json[i]));

        return samples;
    }

    static getLow(samples) {
        return samples.reduce((s1, s2) => Math.min(s1.temp, s2.temp));
    }

    static getHigh(samples) {
        return samples.reduce((s1, s2) => Math.max(s1.temp, s2.temp));
    }
}
