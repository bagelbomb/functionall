'use strict';

const { withScope, scoped } = require('../utils/scope');

// choosing to make === the default, rather than ==
exports.$equals = function (value1, value2) {
  return withScope(scope => {
    const val1 = scoped(value1, scope);
    const val2 = scoped(value2, scope);

    return val1 === val2;
  });
};

exports.$looseEquals = function (value1, value2) {
  return withScope(scope => {
    const val1 = scoped(value1, scope);
    const val2 = scoped(value2, scope);

    return val1 == val2;
  });
};

// TODO: Add greater than, less than, greater than or equal to, and less than or equal to
