import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};

const getParser = (file, fileFormat) => parsers[fileFormat](file);

export default getParser;
