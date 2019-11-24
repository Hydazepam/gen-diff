import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParser from './parsers';
import getRenderer from './formatters';

const getAst = (objBefore, objAfter) => {
  const beforeKeys = Object.keys(objBefore);
  const afterKeys = Object.keys(objAfter);

  const totalKeys = _.union(beforeKeys, afterKeys);

  const result = totalKeys.map((key) => {
    if (_.has(objAfter, key) && _.has(objBefore, key)) {
      if (objAfter[key] instanceof Object && objBefore[key] instanceof Object) {
        return { type: 'nested', key, children: getAst(objBefore[key], objAfter[key]) };
      }
      if (objAfter[key] === objBefore[key]) {
        return { type: 'same', key, children: objAfter[key] };
      }
      return {
        type: 'updated', key, valueBefore: objBefore[key], valueAfter: objAfter[key],
      };
    }
    if (_.has(objAfter, key) && !_.has(objBefore, key)) {
      return { type: 'added', key, valueAfter: objAfter[key] };
    }
    return { type: 'deleted', key, valueBefore: objBefore[key] };
  });

  return result;
};

const getObject = (pathToFile) => {
  const data = fs.readFileSync(pathToFile, 'utf-8');
  const dataFormat = path.extname(pathToFile).split('.')[1];

  return getParser(data, dataFormat);
};

const genDiff = (pathToFile1, pathToFile2, format = 'nested') => {
  const objBefore = getObject(pathToFile1);
  const objAfter = getObject(pathToFile2);

  const ast = getAst(objBefore, objAfter);

  return getRenderer(ast, format);
};

export default genDiff;
