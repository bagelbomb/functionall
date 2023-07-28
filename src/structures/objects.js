'use strict';

const { getTopLevelScope } = require('../utils/topLevelScope');

exports.$object = function (...entries) {
  return (scope = getTopLevelScope()) => {
    const scopedEntries = entries.map(entry =>
      typeof entry === 'function' ? entry(scope) : entry
    );

    return Object.assign({}, ...scopedEntries);
  };
};

exports.$entry = function (key, value) {
  return (scope = getTopLevelScope()) => {
    // if value is passed (passing undefined is allowed):
    if (arguments[1]) {
      const val = typeof value === 'function' ? value(scope) : value;

      return { [key]: val };
    }

    return { [key]: $get(key)(scope) };
  };
};
