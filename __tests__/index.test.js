import fs from 'fs';
import genDiff from '../src';

describe('Simple files', () => {
  test('compare two simple json config files', () => {
    const path1 = './before.json';
    const path2 = './after.json';
    const resultPath = './__tests__/__fixtures__/compareResult.txt';

    const diff = genDiff(path1, path2);
    const result = fs.readFileSync(resultPath, 'utf-8');

    expect(diff).toEqual(result);
  });

  test('compare two simple yaml config files', () => {
    const path1 = './before.yaml';
    const path2 = './after.yaml';
    const resultPath = './__tests__/__fixtures__/compareResult.txt';

    const diff = genDiff(path1, path2);
    const result = fs.readFileSync(resultPath, 'utf-8');

    expect(diff).toEqual(result);
  });

  test('compare two simple ini config files', () => {
    const path1 = './before.ini';
    const path2 = './after.ini';
    const resultPath = './__tests__/__fixtures__/compareResult.txt';

    const diff = genDiff(path1, path2);
    const result = fs.readFileSync(resultPath, 'utf-8');

    expect(diff).toEqual(result);
  });
});
