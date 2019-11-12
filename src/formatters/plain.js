import _ from 'lodash';

const createString = (parents, name, action) => `Property '${[...parents, name].join('.')}' was ${action}`;

const renderValue = (value) => {
  if (value instanceof Object) return '[complex value]';

  if (typeof value === 'string') return `'${value}'`;

  return value;
};

const getPlainDiff = (ast) => {
  const iter = (nodes, parents) => {
    const mapping = {
      fixed: () => null,
      updated: ({
        key, type, valueBefore, valueAfter,
      }) => `${createString(parents, key, type)}. From ${renderValue(valueBefore)} to ${renderValue(valueAfter)}`,
      deleted: ({ key, type }) => createString(parents, key, type),
      added: ({ key, type, valueAfter }) => `${createString(parents, key, type)} with value: ${renderValue(valueAfter)}`,
      nested: ({ key, children }) => iter(children, parents.concat(key)),
    };

    const newNodes = nodes.map((node) => mapping[node.type](node)).filter((s) => !!s);

    return _.flatten(newNodes).join('\n');
  };

  return iter(ast, []);
};

export default getPlainDiff;
