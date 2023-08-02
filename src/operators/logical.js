'use strict';

const { withScope } = require('../utils/scope');

exports.$and = function (...conditions) {
  return withScope(scope => {
    return conditions.every(c => c(scope));
  });
};

exports.$or = function (...conditions) {
  return withScope(scope => {
    return conditions.some(c => c(scope));
  });
};

exports.$not = function (condition) {
  return withScope(scope => {
    return !condition(scope);
  });
};
