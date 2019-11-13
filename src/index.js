import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParser from './parsers';
import getRenderer from './renderers';

const getAst = (objBefore, objAfter) => {
  const beforeKeys = Object.keys(objBefore);
  const afterKeys = Object.keys(objAfter);

  const totalKeys = _.union(beforeKeys, afterKeys);

  const result = totalKeys.reduce((acc, key) => {
    if (_.has(objAfter, key) && _.has(objBefore, key)) {
      if (objAfter[key] instanceof Object && objBefore[key] instanceof Object) {
        return [...acc, { type: 'nested', key, children: getAst(objBefore[key], objAfter[key]) }];
      }
      if (objAfter[key] === objBefore[key]) {
        return [...acc, { type: 'fixed', key, children: objAfter[key] }];
      }
      return [...acc, {
        type: 'updated', key, valueBefore: objBefore[key], valueAfter: objAfter[key],
      }];
    }
    if (_.has(objAfter, key) && !_.has(objBefore, key)) {
      return [...acc, { type: 'added', key, valueAfter: objAfter[key] }];
    }
    return [...acc, { type: 'deleted', key, valueBefore: objBefore[key] }];
  }, []);

  return result;
};

const genDiff = (pathToFile1, pathToFile2, format = 'nested') => {
  const fileDataBefore = fs.readFileSync(pathToFile1, 'utf-8');
  const fileDataAfter = fs.readFileSync(pathToFile2, 'utf-8');

  const objBefore = getParser(path.extname(pathToFile1))(fileDataBefore);
  const objAfter = getParser(path.extname(pathToFile2))(fileDataAfter);

  const ast = getAst(objBefore, objAfter);

  return getRenderer(format)(ast);
};

export default genDiff;
