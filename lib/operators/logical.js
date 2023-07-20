'use strict';

const { getTopLevelScope } = require('../topLevelScope');

exports.$and = function (...conditions) {
  return (scope = getTopLevelScope()) => {
    return conditions.every(c => c(scope));
  };
};

exports.$or = function (...conditions) {
  return (scope = getTopLevelScope()) => {
    return conditions.some(c => c(scope));
  };
};

exports.$not = function (condition) {
  return (scope = getTopLevelScope()) => {
    return !condition(scope);
  };
};
