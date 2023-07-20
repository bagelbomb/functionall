'use strict';

const { getTopLevelScope } = require('../topLevelScope');

exports.$block = function (...statements) {
  return (scope = getTopLevelScope()) => {
    const innerScope = { upperScope: scope };

    // TODO: implement hoisting of functions by moving $function statements to the start (wouldn't work for outside calls)?
    statements.forEach(s => s(innerScope));
  };
};
