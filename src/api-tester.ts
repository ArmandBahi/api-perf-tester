import axios, { AxiosInstance } from "axios";
import https from 'https';

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

export class APITester {
    private properties: APIProperties;

    constructor(properties: APIProperties) {
        this.properties = properties;
    }

    /**
     * Starts the test
     */
    public startTest() {
        if (this.properties.scenario) {
            this.runScenario_({
                scenario: this.properties.scenario,
            });
        } else if (this.properties.url) {
            this.runRequest_({
                url: this.properties.url,
                headers: this.properties.headers,
                method: this.properties.method,
                params: this.properties.params,
            });
        }
    }

    private runScenario_(scenario: RunScenarioOptions) {
        console.log('runScenario_', scenario);

    }

    /**
     * Runs a request
     * @param opt_options 
     */
    private async runRequest_(opt_options: RunRequestOptions) {
        console.log('runRequest_', opt_options);

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
            console.log('Request ok', res.data);
            return res;
        } catch (err) {
            console.log('Request failed', err, err);
        }
    }

}