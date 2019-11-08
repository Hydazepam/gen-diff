import _ from 'lodash';

const getIndent = (depth) => '  '.repeat(depth);

const createString = (name, value, depth, sign = ' ') => {
  if (!(value instanceof Object)) {
    return `${getIndent(depth)}${sign} ${name}: ${value}`;
  }
  const children = Object.keys(value).map((key) => createString(key, value[key], depth + 2));
  return _.flatten([
    `${getIndent(depth)}${sign} ${name}: {`,
    children,
    `${getIndent(depth)}  }`,
  ]).join('\n');
};

const getRenderer = (ast) => {
  const iter = (nodes, depth) => {
    const mapping = {
      fixed: ({ key, children }) => createString(key, children, depth + 1),
      updated: ({ key, valueBefore, valueAfter }) => [createString(key, valueAfter, depth + 1, '+'), createString(key, valueBefore, depth + 1, '-')],
      deleted: ({ key, valueBefore }) => createString(key, valueBefore, depth + 1, '-'),
      added: ({ key, valueAfter }) => createString(key, valueAfter, depth + 1, '+'),
      nested: ({ key, children }) => [`${getIndent(depth + 1)}  ${key}: {`, iter(children, depth + 2), `${getIndent(depth + 1)}  }`],
    };

    const newNodes = nodes.map((node) => mapping[node.type](node));

    return _.flatten(newNodes).join('\n');
  };

  return `{\n${iter(ast, 0)}\n}`;
};

export default getRenderer;
