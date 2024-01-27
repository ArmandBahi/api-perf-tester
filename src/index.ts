import yargs, { config } from 'yargs';
import fs from 'fs';
import { args } from './yargs-config'
import { APITester, APITesterProperties } from './api-tester';

/**
 * Read config file
 */
function readProjectFile(filePath: string): any {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        reject();
        return
      }
      let config = JSON.parse(data);
      resolve(config);
    })
  });
}

/**
 * Run the test
 */
function runTest(opt_options: APITesterProperties) {
  const apiTester = new APITester(opt_options);
  apiTester.startTest();
}

// Récupère les properties
if ((args as any)._[0]) {
  const command: string = (args as any)._[0];
  readProjectFile((args as any).project).then((projectFile: any) => {
    if (!projectFile) {
      console.error('Cannor load project file');
      return;
    }
      try {
        console.log('Command Start', args, 'DEBUG');
        // si une fonction avec le nom de la commande existe alors elle sera appelée
        return eval(command)({
        ...projectFile,
        resultPath: (args as any).result,
        period: (args as any).period,
      });
    } catch (error) {
      console.log(`Command error : function not valid : ${command}`);
      return false;
    }
  })
} else {
  yargs.showHelp("log");
}