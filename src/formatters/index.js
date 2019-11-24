import getNestedDif from './nested';
import getPlainDiff from './plain';

const renders = {
  nested: getNestedDif,
  plain: getPlainDiff,
  json: JSON.stringify,
};

const getRenderer = (ast, format) => renders[format](ast);

export default getRenderer;
