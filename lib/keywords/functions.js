'use strict';

const { getTopLevelScope } = require('../topLevelScope');
const { $let } = require('./variables');

// TODO: implement arrow functions

exports.$function = function (name, params, functionBlock) {
  return (scope = getTopLevelScope()) => {
    // choosing to follow strict mode here (block-scoped functions) and to disallow redefining functions

    if (name && scope[name]) {
      throw new SyntaxError(`Identifier '${name}' has already been declared`);
    }

    const fn = function (...args) {
      const innerScope = { upperScope: scope };

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

// $function('saySomething', ['text'], $call($get(console, 'log'), $get('text')))()
// $call($get('saySomething'), 'hi there')()

// $function('add', ['num1', 'num2'], $return($add($get('num1'), $get('num2'))))()
// $call($get('add'), 1, 4)()
