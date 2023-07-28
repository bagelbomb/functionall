'use strict';

const { getTopLevelScope } = require('../utils/topLevelScope');
const hoistFunctions = require('../utils/hoistFunctions');

exports.$block = function (...statements) {
  return (scope = getTopLevelScope()) => {
    const orderedStatements = hoistFunctions(statements);
    const innerScope = { upperScope: scope };

    orderedStatements.forEach(s => s(innerScope));
  };
};
