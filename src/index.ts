import yargs, { config } from 'yargs';
import fs from 'fs';
import { args } from './yargs-config'
import { APITester } from './api-tester';

/**
 * Read config file
 */
function readConfigFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('config.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        reject();
        return
      }
      console.log(data)
      let config = JSON.parse(data);
      resolve(config);
    })
  });
}

/**
 * Run the test
 */
function runTest(properties: any) {
  const apiTester = new APITester(properties);
  apiTester.startTest();
}

// Récupère les properties
if ((args as any)._[0]) {
  const command: string = (args as any)._[0];
  readConfigFile().then((properties) => {
    try {
      console.log('Command Start', args, 'DEBUG');
      // si une fonction avec le nom de la commande existe alors elle sera appelée
      return eval(command)(properties);
    } catch (error) {
      console.log(`Command error : function not valid : ${command}`);
      return false;
    }
  })
} else {
  yargs.showHelp("log");
}