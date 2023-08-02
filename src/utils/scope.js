'use strict';

let topLevelScope;

function getTopLevelScope() {
  return topLevelScope;
}

function resetTopLevelScope() {
  topLevelScope = {};
}

function withScope(fn) {
  const fnWithScope = (scope = getTopLevelScope()) => {
    return fn(scope);
  };

  fnWithScope.functionall = true;

  return fnWithScope;
}

function scoped(val, scope) {
  if (typeof val === 'function' && val.functionall) {
    return val(scope);
  }

  if (Array.isArray(val)) {
    return val.map(v => scoped(v, scope));
  }

  return val;
}

module.exports = {
  getTopLevelScope,
  resetTopLevelScope,
  withScope,
  scoped,
};
