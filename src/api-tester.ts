import axios, { AxiosInstance } from "axios";
import https from 'https';
import * as jmespath from 'jmespath';

export interface APIProperties {
    period: number; // Period in minutes
    url?: string; // Query URL
    headers?: any; // Headers to put into the query
    method?: string; // GET, POST, PUT, DELETE
    params?: any; // Params to use on the request (query id method=GET, body otherwise)
    scenario?: RunRequestOptions[]; // A Scenario allows you to chain multiple requests and use the previous results
}

export interface RunScenarioOptions {
    scenario: RunRequestOptions[]
}

export interface RunRequestOptions {
    url: string; // Query URL
    headers?: any; // Headers to put into the query
    method?: string; // GET, POST, PUT, DELETE
    params?: any; // Params to use on the request (query id method=GET, body otherwise)
}

interface ReplaceObjectOptions {
    objectToReplace: any;
    replacementData: any;
}

export class APITester {
    private properties: APIProperties;

    constructor(properties: APIProperties) {
        this.properties = properties;
    }

    /**
     * Starts the test
     */
    public startTest() {
        setInterval(async () => {

            const startDate = Date.now();

            await this.runRequests_();

            const endDate = Date.now();

            const reqTime = endDate - startDate;
            console.log('/!\\ ------- reqTime ------- /!\\', reqTime);


        }, 10000);
    }

    /**
     * Run the requests scenario or single request
     */
    private async runRequests_() {
        if (this.properties.scenario) {
            await this.runScenario_({
                scenario: this.properties.scenario,
            });
        } else if (this.properties.url) {
            await this.runRequest_({
                url: this.properties.url,
                headers: this.properties.headers,
                method: this.properties.method,
                params: this.properties.params,
            });
        }
    }

    /**
     * Runs a scenario
     * @param opt_options 
     */
    private async runScenario_(opt_options: RunScenarioOptions) {
        const results = [];
        for (let i = 0; i < opt_options.scenario.length; i++) {

            // Replace the values between braces
            const reqOptions = this.replaceValuesWithJmesPath_({
                objectToReplace: opt_options.scenario[i],
                replacementData: { results },
            });

            // Runs the request and store data into results
            results[i] = await this.runRequest_(reqOptions);
        }
    }

    /**
     * Runs a request
     * @param opt_options 
     */
    private async runRequest_(opt_options: RunRequestOptions) {
        const oAxiosInstanceServer: AxiosInstance = axios.create({
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }),
            headers: opt_options.headers ?? {},
        });

        let params: any = {
            method: opt_options.method ? opt_options.method.toLowerCase() : 'get',
            url: opt_options.url,
        };

        if (opt_options.params) {
            if (params.method === 'get') {
                params.params = opt_options.params;
            } else {
                params.data = opt_options.params;
            }
        }

        try {
            const res = await oAxiosInstanceServer(params);
            console.log('Request ok');
            return res.data;
        } catch (err) {
            console.log('Request failed', err, err);
        }
    }

    /**
     * Replaces values in an object using JMESPath expressions.
     * @param options - The options containing the object to replace and the replacement data.
     * @returns The object with values replaced.
     */
    private replaceValuesWithJmesPath_(options: ReplaceObjectOptions): any {
        const { objectToReplace, replacementData } = options;

        // Callback function to replace JMESPath values
        const replaceCallback = (value: any): any => {
            if (typeof value === 'string' && value.startsWith('{{') && value.endsWith('}}')) {
                // If the value is a JMESPath expression within curly braces, evaluate and replace
                const jmesPathExpression = value.slice(2, -2); // Remove the curly braces
                const result = jmespath.search(replacementData, jmesPathExpression);
                return result !== null ? result : value; // If JMESPath search is null, leave the original value
            }
            return value;
        };

        // Use the deep traversal function with the callback
        return this.deepTraversal_(objectToReplace, replaceCallback);
    }

    /**
     * Recursively traverses an object's properties and applies a callback function.
     * @param obj - The object to traverse.
     * @param callback - The callback function to apply to each value.
     * @returns The traversed object with values modified by the callback.
     */
    private deepTraversal_(obj: any, callback: (value: any) => any): any {
        if (Array.isArray(obj)) {
            // If the value is an array, apply the callback function to each array element
            return obj.map(callback);
        } else if (typeof obj === 'object' && obj !== null) {
            // If the value is an object, apply the callback function to each property of the object
            const result: any = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    result[key] = this.deepTraversal_(obj[key], callback);
                }
            }
            return result;
        } else {
            // If the value is neither an object nor an array, apply the callback function directly
            return callback(obj);
        }
    }
}