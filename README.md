# api-perf-tester
A performance testing tool designed specifically for evaluating an API's performance at regular intervals.

## Install

```sh
npm install
```

## Running a test

First you need to complete you scenario into a `config.json` file placed on the root of the project.

Then run `npm start -- runTest --period=5 --project=config.json --result=result.csv`

## Scenario options

#### Single request

- `url` : (string) request URL
- `headers` : (object) request headers 
- `method` : (string) get/post/put/detele
- `params` : (object) rquest parameters. As query if method=get, body otherwise

example : 
```json
{
    "url": "https://....",
    "headers": {
        "Authorization": "{{results[0].data.token}}"
    },
    "method": "get",
    "params": {
        ...
    }
}
```

#### Scenario

- `scenario` : array of  sigle request objects, braces as **jmespath** queries could be use to ge previous requests results

example : 
```json
{
    "scenario": [
        {
            "url": "https://..../token",
            "headers": {},
            "method": "post",
            "params": {
                "user": "myuser",
                "password": "mypass"
            }
        },
        {
            "url": "https://....",
            "headers": {
                "Authorization": "{{results[0].data.token}}"
            },
            "method": "get",
            "params": {
                ...
            }
        }
    ]
}
```