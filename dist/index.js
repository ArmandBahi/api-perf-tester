"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var fs_1 = __importDefault(require("fs"));
var yargs_config_1 = require("./yargs-config");
var api_tester_1 = require("./api-tester");
/**
 * Read config file
 */
function readConfigFile() {
    return new Promise(function (resolve, reject) {
        fs_1.default.readFile('config.json', 'utf8', function (err, data) {
            if (err) {
                console.error(err);
                reject();
                return;
            }
            console.log(data);
            var config = JSON.parse(data);
            resolve(config);
        });
    });
}
/**
 * Run the test
 */
function runTest(properties) {
    var apiTester = new api_tester_1.APITester(properties);
    apiTester.startTest();
}
// Récupère les properties
if (yargs_config_1.args._[0]) {
    var command_1 = yargs_config_1.args._[0];
    readConfigFile().then(function (properties) {
        try {
            console.log('Command Start', yargs_config_1.args, 'DEBUG');
            // si une fonction avec le nom de la commande existe alors elle sera appelée
            return eval(command_1)(properties);
        }
        catch (error) {
            console.log("Command error : function not valid : ".concat(command_1));
            return false;
        }
    });
}
else {
    yargs_1.default.showHelp("log");
}
//# sourceMappingURL=index.js.map