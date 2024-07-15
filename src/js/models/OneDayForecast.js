import Samples from './Sample';

export default class OneDayForecast {
    constructor(samples) {
        this.low = Samples.getLow(samples);
        this.high = Samples.getHigh(samples);

        Object.assign(this, { samples });
    }

    getSamples() {
        return this.samples;
    }
}
