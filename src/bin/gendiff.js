#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig, { format }) => {
    console.log(genDiff(firstConfig, secondConfig, format));
  });

program.parse(process.argv);
