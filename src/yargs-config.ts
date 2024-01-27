import yargs from 'yargs';

/**
 * Command line arguments
 */
export const args = yargs
  .usage('$0 <cmd> [OPTIONS]')
  .command('runTest', 'Starts API test', {})
  .options({
    'period': {
      describe: 'Requests looping period (seconds)',
      demandOption: true,
      type: 'number',
      normalize: true,
    },
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