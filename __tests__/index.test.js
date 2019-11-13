import fs from 'fs';
import genDiff from '../src';

describe('Simple files', () => {
  test.each([['./__tests__/__fixtures__/nestedBefore.json', './__tests__/__fixtures__/nestedAfter.json', './__tests__/__fixtures__/compareResultNested.txt'],
    ['./__tests__/__fixtures__/nestedBefore.yaml', './__tests__/__fixtures__/nestedAfter.yaml', './__tests__/__fixtures__/compareResultNested.txt'],
    ['./__tests__/__fixtures__/nestedBefore.ini', './__tests__/__fixtures__/nestedAfter.ini', './__tests__/__fixtures__/compareResultNested.txt']])(
    'compare two nested config files',
    (path1, path2, resultPath) => {
      const diff = genDiff(path1, path2, 'nested');
      const result = fs.readFileSync(resultPath, 'utf-8');
      expect(diff).toBe(result);
    },
  );

  test.each([['./__tests__/__fixtures__/nestedBefore.json', './__tests__/__fixtures__/nestedAfter.json', './__tests__/__fixtures__/compareResultNested.txt'],
    ['./__tests__/__fixtures__/nestedBefore.yaml', './__tests__/__fixtures__/nestedAfter.yaml', './__tests__/__fixtures__/compareResultNested.txt'],
    ['./__tests__/__fixtures__/nestedBefore.ini', './__tests__/__fixtures__/nestedAfter.ini', './__tests__/__fixtures__/compareResultNested.txt']])(
    'compare two nested config files without indicated format',
    (path1, path2, resultPath) => {
      const diff = genDiff(path1, path2);
      const result = fs.readFileSync(resultPath, 'utf-8');
      expect(diff).toBe(result);
    },
  );

  test.each([['./__tests__/__fixtures__/nestedBefore.json', './__tests__/__fixtures__/nestedAfter.json', './__tests__/__fixtures__/compareResultNestedPlain.txt'],
    ['./__tests__/__fixtures__/nestedBefore.yaml', './__tests__/__fixtures__/nestedAfter.yaml', './__tests__/__fixtures__/compareResultNestedPlain.txt'],
    ['./__tests__/__fixtures__/nestedBefore.ini', './__tests__/__fixtures__/nestedAfter.ini', './__tests__/__fixtures__/compareResultNestedPlain.txt']])(
    'compare two nested config files with plain output',
    (path1, path2, resultPath) => {
      const diff = genDiff(path1, path2, 'plain');
      const result = fs.readFileSync(resultPath, 'utf-8');
      expect(diff).toBe(result);
    },
  );

  test.each([['./__tests__/__fixtures__/nestedBefore.json', './__tests__/__fixtures__/nestedAfter.json', './__tests__/__fixtures__/compareResultNested.json'],
    ['./__tests__/__fixtures__/nestedBefore.yaml', './__tests__/__fixtures__/nestedAfter.yaml', './__tests__/__fixtures__/compareResultNested.json'],
    ['./__tests__/__fixtures__/nestedBefore.ini', './__tests__/__fixtures__/nestedAfter.ini', './__tests__/__fixtures__/compareResultNested.json']])(
    'compare two nested config files with JSON output',
    (path1, path2, resultPath) => {
      const diff = genDiff(path1, path2, 'json');
      const result = fs.readFileSync(resultPath, 'utf-8');
      expect(diff).toBe(result);
    },
  );
});
