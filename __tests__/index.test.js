import fs from 'fs';
import genDiff from '../src';

describe('Simple files', () => {
  test.each([['./before.json', './after.json', './__tests__/__fixtures__/compareResult.txt'],
    ['./before.yaml', './after.yaml', './__tests__/__fixtures__/compareResult.txt'],
    ['./before.ini', './after.ini', './__tests__/__fixtures__/compareResult.txt']])(
    'compare two simple config files',
    (path1, path2, resultPath) => {
      const diff = genDiff(path1, path2);
      const result = fs.readFileSync(resultPath, 'utf-8');
      expect(diff).toBe(result);
    },
  );
});
