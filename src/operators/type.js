'use strict';

const { withScope, scoped } = require('../utils/scope');

exports.$typeOf = function (value) {
  return withScope(scope => {
    const val = scoped(value, scope);

    return typeof val;
  });
};
