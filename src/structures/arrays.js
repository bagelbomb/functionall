'use strict';

const { withScope, scoped } = require('../utils/scope');

exports.$array = function (...items) {
  return withScope(scope => {
    return scoped(items, scope);
  });
};
