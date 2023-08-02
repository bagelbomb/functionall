'use strict';

const { withScope, scoped } = require('../utils/scope');

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

exports.$let = function (name, value) {
  return withScope(scope => {
    if (scope[name]) {
      throw new SyntaxError(`Identifier '${name}' has already been declared`);
    }

    const val = scoped(value, scope);

    scope[name] = { type: 'let', value: val };
  });
};

exports.$const = function (name, value) {
  return withScope(scope => {
    // if value isn't passed (passing undefined is allowed):
    if (!arguments[1]) {
      throw new SyntaxError('Missing initializer in const declaration');
    }

    if (scope[name]) {
      throw new SyntaxError(`Identifier '${name}' has already been declared`);
    }

    const val = scoped(value, scope);

    scope[name] = { type: 'const', value: val };
  });
};

exports.$get = function (name, ...keys) {
  return withScope(scope => {
    if (typeof name === 'string') {
      const variable = recursiveLookup(name, scope);

      if (!variable) {
        throw new ReferenceError(`${name} is not defined`);
      }

      const val = keys.length
        ? recursiveGetProp(variable.value, keys)
        : variable.value;

      return val;
    }

    return recursiveGetProp(name, keys);
  });
};

exports.$set = function (name, value) {
  return withScope(scope => {
    const variable = recursiveLookup(name, scope);

    if (!variable) {
      throw new ReferenceError(`${name} is not defined`);
      // choosing to follow strict mode here (no global variables)
    }

    if (variable.type === 'const' || variable.type === 'function') {
      throw new TypeError('Assignment to constant variable.');
    }

    const val = scoped(value, scope);

    variable.value = val;
  });
};
