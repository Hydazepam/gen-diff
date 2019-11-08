import yaml from 'js-yaml';
import ini from 'ini';

const typeOfFilesList = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const getParser = (format) => (data) => {
  const parseFunc = typeOfFilesList[format];
  return parseFunc(data);
};

export default getParser;
