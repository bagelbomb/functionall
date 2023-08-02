'use strict';

const { withScope, scoped } = require('../utils/scope');

exports.$object = function (...entries) {
  return withScope(scope => {
    const scopedEntries = scoped(entries, scope);

    return Object.assign({}, ...scopedEntries);
  });
};

exports.$entry = function (key, value) {
  return withScope(scope => {
    // if value is passed (passing undefined is allowed):
    if (arguments[1]) {
      const val = scoped(value, scope);

      return { [key]: val };
    }

    return { [key]: scoped($get(key), scope) };
  });
};
