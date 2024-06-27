import '../../../src/js/General';



export default class LocalStorage {

    // JSON Object that holds default string key names and default values if no values exist

    static DEFAULTS = {};



    constructor(config) {

        // Define the default string keys to access the local storage. Expects JSON object with string keys and default value types.

        // EX. {"news": {lastFetch: new Date(), stories: null},  "favorites": new Array()}

        if (config.defaults !== undefined)

            LocalStorage.DEFAULTS = config.defaults;

    }



    // Using the string key, return from local storage the value stored. If it is undefined, search on the defaults object for a base structure

    getValue(key) {

        return localStorage[key] === undefined ? LocalStorage.DEFAULTS[key] : JSON.parse(localStorage[key]);

    }



    // Using the string key, set local storage to the passed value

    setValue(key, value) {

        if (value !== undefined)

            localStorage[key] = JSON.stringify(value);

    }



    // Clear all local storage

    clearAll() {

        // TODO: This should really be constrained to the keys that it accesses.

        localStorage.clear();

    }

}
