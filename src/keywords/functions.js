'use strict';

const { getTopLevelScope } = require('../utils/topLevelScope');
const { $let } = require('./variables');

// TODO: implement arrow functions

exports.$function = function (name, params, functionBlock) {
  const scopedFn = (scope = getTopLevelScope()) => {
    // choosing to follow strict mode here (block-scoped functions) and to disallow redefining functions

    if (name && scope[name]) {
      throw new SyntaxError(`Identifier '${name}' has already been declared`);
    }

    const fn = function (...args) {
      const innerScope = { upperScope: scope };

      // TODO: make params an $array or something
      params.forEach((p, i) => $let(p, args[i])(innerScope));

      return functionBlock(innerScope);
    };

    if (name) {
      scope[name] = { type: 'function', value: fn };
    }
    else {
      // anonymous function expression
      return fn;
    }
  };

  if (name) {
    // Only named functions should be hoisted
    scopedFn.functionallFunction = true;
  }

  return scopedFn;
};

// TODO: implement $return calls inside blocks
exports.$return = function (expression) {
  return (scope = getTopLevelScope()) => {
    return typeof expression === 'function' ? expression(scope) : expression;
  }
}

exports.$call = function (fn, ...params) {
  return (scope = getTopLevelScope()) => {
    const scopedFn = fn(scope);
    // TODO: check if it's an internal Functionall function somehow?
    // TODO: let fn be the string name of a function?

    const scopedParams = params.map(p =>
      typeof p === 'function' ? p(scope) : p
    );

    return scopedFn(...scopedParams);
  };
};
