class Sample {
    constructor() {
        const SIX_AM = 2;
        const NOON = 4;
        const SIX_PM = 6;
        const NINE_PM = 7;
        const MORNING = SIX_AM;
        const DAY = NOON;
        const EVENING = SIX_PM;
        const NIGHT = NINE_PM;

        this.dt = new Date(samples[NOON].dt * 1000);
        this.temp = samples[NOON].main.temp;
        this.minTemp = this.getLow(samples);
        this.maxTemp = this.getHigh(samples);
        this.morningTemp = samples[MORNING].main.temp;
        this.dayTemp = samples[DAY].main.temp;
        this.eveningTemp = samples[EVENING].main.temp;
        this.nightTemp = samples[NIGHT].main.temp;
        this.description = samples[NOON].weather[0].description;
        this.icon = samples[NOON].weather[0].icon;
        this.pressure = samples[NOON].main.pressure;
        this.wind = samples[NOON].wind.speed;
        this.humidity = samples[NOON].main.humidity;
    }
}
