'use strict';

const { withScope } = require('../utils/scope');
const hoistFunctions = require('../utils/hoistFunctions');

exports.$block = function (...statements) {
  return withScope(scope => {
    const orderedStatements = hoistFunctions(statements);
    const innerScope = { upperScope: scope };

    orderedStatements.forEach(s => s(innerScope));
  });
};
