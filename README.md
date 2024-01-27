# api-perf-tester
A performance testing tool designed specifically for evaluating an API's performance at regular intervals.

## Install

```sh
npm install
```

## Running a test

First you need to complete you scenario into a `config.json` file placed on the root of the project.

Then run `npm start -- runTest --project=config.json --result=result.json`