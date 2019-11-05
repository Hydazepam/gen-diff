import getParser from './parsers';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const genDiff = (pathToFile1, pathToFile2) => {
  const absolutePathToFileBefore = path.resolve('./__tests__/__fixtures__/', pathToFile1);
  const absolutePathToFileAfter = path.resolve('./__tests__/__fixtures__/', pathToFile2);

  const fileDataBefore = fs.readFileSync(absolutePathToFileBefore, 'utf-8');
  const fileDataAfter = fs.readFileSync(absolutePathToFileAfter, 'utf-8');

  const objBefore = getParser(path.extname(pathToFile1))(fileDataBefore);
  const objAfter = getParser(path.extname(pathToFile2))(fileDataAfter);

  const beforeKeys = Object.keys(objBefore);
  const afterKeys = Object.keys(objAfter);

  const totalKeys = _.union(beforeKeys, afterKeys);

  const result = totalKeys.reduce((acc, el) => {
    if (objBefore[el] === objAfter[el]) {
      acc.push(`  ${el}: ${objBefore[el]}`);
    }
    if (objBefore[el] !== objAfter[el]) {
      if (!objAfter[el]) {
        acc.push(`- ${el}: ${objBefore[el]}`);
      }
      if (!objBefore[el] && objAfter[el]) {
        acc.push(`+ ${el}: ${objAfter[el]}`);
      }
      if (objBefore[el] && objAfter[el]) {
        acc.push(`+ ${el}: ${objAfter[el]}`);
        acc.push(`- ${el}: ${objBefore[el]}`);
      }
    }
    return acc;
  }, []);
  return `{\n  ${result.join('\n  ')}\n}`;
};

export default genDiff;
