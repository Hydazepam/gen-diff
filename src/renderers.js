import getNestedDif from './formatters/nested';
import getPlainDiff from './formatters/plain';
import getJsonDif from './formatters/json';

const renders = {
  nested: getNestedDif,
  plain: getPlainDiff,
  json: getJsonDif,
};

const getRenderer = (format) => renders[format];

export default getRenderer;
