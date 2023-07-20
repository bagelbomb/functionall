'use strict';

const { getTopLevelScope } = require('../topLevelScope');

exports.$array = function (...items) {
  return (scope = getTopLevelScope()) => {
    return items.map(item => (typeof item === 'function' ? item(scope) : item));
  };
};
