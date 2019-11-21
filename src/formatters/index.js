import getNestedDif from './nested';
import getPlainDiff from './plain';
import getJsonDif from './json';

const renders = {
  nested: getNestedDif,
  plain: getPlainDiff,
  json: getJsonDif,
};

const getRenderer = (ast, format) => renders[format](ast);

export default getRenderer;
