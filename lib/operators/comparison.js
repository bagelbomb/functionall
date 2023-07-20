'use strict';

const { getTopLevelScope } = require('../topLevelScope');

// choosing to make === the default, rather than ==
exports.$equals = function (value1, value2) {
  return (scope = getTopLevelScope()) => {
    const val1 = typeof value1 === 'function' ? value1(scope) : value1;
    const val2 = typeof value2 === 'function' ? value2(scope) : value2;

    return val1 === val2;
  };
};

exports.$looseEquals = function (value1, value2) {
  return (scope = getTopLevelScope()) => {
    const val1 = typeof value1 === 'function' ? value1(scope) : value1;
    const val2 = typeof value2 === 'function' ? value2(scope) : value2;

    return val1 == val2;
  };
};

// TODO: Add greater than, less than, greater than or equal to, and less than or equal to
