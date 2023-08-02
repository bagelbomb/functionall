'use strict';

const { withScope, scoped } = require('../utils/scope');
const { $let } = require('./variables');

// TODO: implement arrow functions

exports.$function = function (name, params, functionBlock) {
  const scopedFn = withScope(scope => {
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
    } else {
      // anonymous function expression
      return fn;
    }
  });

  if (name) {
    // Only named functions should be hoisted
    scopedFn.functionallFunction = true;
  }

  return scopedFn;
};

// TODO: implement $return calls inside blocks
exports.$return = function (expression) {
  return withScope(scope => {
    return scoped(expression, scope);
  });
};

exports.$call = function (fn, ...params) {
  return withScope(scope => {
    const scopedFn =
      typeof fn === 'string' ? scoped($get(fn), scope) : scoped(fn, scope);

    const scopedParams = scoped(params, scope);

    return scopedFn(...scopedParams);
  });
};
