// URL class takes in a domain path with parameters and compiles them together

export default class Url {

    constructor(path, param = {}) {

        this.path = path; // Ex. https://domain.com/api/v2/

        this.query = param; // Ex. {api: 123apikey, query: "Big hats"}

    }

    // Adds a parameter to the query

    addParam(k, v) {

        this.query[k] = v;

    }



    // toString constructs the query parameters into a second string and appends it to the url

    toString() {

        let url = this.path + "?";

        let parts = [];

        for (const [key, value] of Object.entries(this.query)) // Your keys passed in from param will be the query parameters, and their values will be the values of those parameters

            parts.push([key, value].join('='));



        return url + parts.join('&');

    }

}



// Homework:

/*



*/
