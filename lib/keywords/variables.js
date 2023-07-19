'use strict';

const { getTopLevelScope } = require('../topLevelScope');

function recursiveGetProp(obj, keys) {
  if (keys.length === 0) {
    return obj;
  }

  return recursiveGetProp(obj[keys[0]], keys.slice(1));
}

function recursiveLookup(name, currentScope) {
  if (currentScope[name]) {
    return currentScope[name];
  }

  if (!currentScope.upperScope) {
    return undefined;
  }

  return recursiveLookup(name, currentScope.upperScope);
}

// TODO: let values be other functionall calls

exports.$let = function (name, value) {
  return (scope = getTopLevelScope()) => {
    if (scope[name]) {
      throw new SyntaxError(`Identifier '${name}' has already been declared`);
    } else {
      scope[name] = { type: 'let', value };
    }
  };
};

exports.$const = function (name, value) {
  return (scope = getTopLevelScope()) => {
    if (scope[name]) {
      throw new SyntaxError(`Identifier '${name}' has already been declared`);
    } else {
      if (value) {
        scope[name] = { type: 'const', value };
      } else {
        throw new SyntaxError('Missing initializer in const declaration');
      }
    }
  };
};

exports.$get = function (name, ...keys) {
  return (scope = getTopLevelScope()) => {
    if (typeof name === 'string') {
      const variable = recursiveLookup(name, scope);

      if (!variable) {
        throw new ReferenceError(`${name} is not defined`);
      }

      return keys.length
        ? recursiveGetProp(variable.value, keys)
        : variable.value;
    }

    return recursiveGetProp(name, keys);
  };
};

exports.$set = function (name, value) {
  return (scope = getTopLevelScope()) => {
    const variable = recursiveLookup(name, scope);

    if (!variable) {
      throw new ReferenceError(`${name} is not defined`);
      // choosing to follow strict mode here (no global variables)
    }

    if (variable.type === 'const') {
      throw new TypeError('Assignment to constant variable.');
    }

    variable.value = value;
  };
};
