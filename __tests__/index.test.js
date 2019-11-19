import fs from 'fs';
import genDiff from '../src';

const absolutePath = `${__dirname}/__fixtures__`;

describe('Simple files', () => {
  test.each([[`${absolutePath}/nestedBefore.json`, `${absolutePath}/nestedAfter.json`],
    [`${absolutePath}/nestedBefore.yaml`, `${absolutePath}/nestedAfter.yaml`],
    [`${absolutePath}/nestedBefore.ini`, `${absolutePath}/nestedAfter.ini`]])(
    'compare two nested config files',
    (path1, path2) => {
      const resultPath = `${absolutePath}/compareResultNested.txt`;
      const diff = genDiff(path1, path2, 'nested');
      const result = fs.readFileSync(resultPath, 'utf-8');
      expect(diff).toBe(result);
    },
  );

  test.each([[`${absolutePath}/nestedBefore.json`, `${absolutePath}/nestedAfter.json`],
    [`${absolutePath}/nestedBefore.yaml`, `${absolutePath}/nestedAfter.yaml`],
    [`${absolutePath}/nestedBefore.ini`, `${absolutePath}/nestedAfter.ini`]])(
    'compare two nested config files without indicated format',
    (path1, path2) => {
      const resultPath = `${absolutePath}/compareResultNested.txt`;
      const diff = genDiff(path1, path2);
      const result = fs.readFileSync(resultPath, 'utf-8');
      expect(diff).toBe(result);
    },
  );

  test.each([[`${absolutePath}/nestedBefore.json`, `${absolutePath}/nestedAfter.json`],
    [`${absolutePath}/nestedBefore.yaml`, `${absolutePath}/nestedAfter.yaml`],
    [`${absolutePath}/nestedBefore.ini`, `${absolutePath}/nestedAfter.ini`]])(
    'compare two nested config files with plain output',
    (path1, path2) => {
      const resultPath = `${absolutePath}/compareResultNestedPlain.txt`;
      const diff = genDiff(path1, path2, 'plain');
      const result = fs.readFileSync(resultPath, 'utf-8');
      expect(diff).toBe(result);
    },
  );

  test.each([[`${absolutePath}/nestedBefore.json`, `${absolutePath}/nestedAfter.json`],
    [`${absolutePath}/nestedBefore.yaml`, `${absolutePath}/nestedAfter.yaml`],
    [`${absolutePath}/nestedBefore.ini`, `${absolutePath}/nestedAfter.ini`]])(
    'compare two nested config files with JSON output',
    (path1, path2) => {
      const resultPath = `${absolutePath}/compareResultNested.json`;
      const diff = genDiff(path1, path2, 'json');
      const result = fs.readFileSync(resultPath, 'utf-8');
      expect(diff).toBe(result);
    },
  );
});
