import getNestedDif from './formatters/nested';
import getPlainDiff from './formatters/plain';

const renders = {
  nested: getNestedDif,
  plain: getPlainDiff,
};

const getRenderer = (format) => renders[format];

export default getRenderer;
