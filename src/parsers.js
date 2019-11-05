const yaml = require('js-yaml');
const ini = require('ini');

const typeOfFilesList = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const getParser = (format) => (data) => {
  const parseFunc = typeOfFilesList[format];
  if (!parseFunc) {
    throw new Error(`unkown format: ${format}`);
  }
  return parseFunc(data);
};

export default getParser;
