"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.args = void 0;
var yargs_1 = __importDefault(require("yargs"));
/**
 * Command line arguments
 */
exports.args = yargs_1.default
    .usage('$0 <cmd> [OPTIONS]')
    .command('runTest', 'Starts API test', {})
    .options({
    'project': {
        describe: 'Project file path (JSON)',
        demandOption: true,
        type: 'string',
        normalize: true,
    },
    'result': {
        describe: 'Result file path (CSV)',
        demandOption: true,
        type: 'string',
        normalize: true,
    },
})
    .wrap(null)
    .help('help')
    .alias('h', 'help')
    .version(false)
    .locale('fr')
    .strict() // blocking non known commands
    .argv;
//# sourceMappingURL=yargs-config.js.map