'use strict';

const { getTopLevelScope } = require('../topLevelScope');

exports.$typeOf = function (value) {
  return (scope = getTopLevelScope()) => {
    const val = typeof value === 'function' ? value(scope) : value;

    return typeof val;
  };
};
