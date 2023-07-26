'use strict';

const { getTopLevelScope } = require('../topLevelScope');

exports.$if = function (condition, ifBlock, ...elseStatements) {
  return (scope = getTopLevelScope()) => {
    const innerScope = { upperScope: scope };

    if (condition(scope)) {
      ifBlock(innerScope);
    } else {
      elseStatements.every(e => e(innerScope));
    }
  };
};

exports.$else = function (elseBlock) {
  return (scope = getTopLevelScope()) => {
    elseBlock(scope);
    return false;
  };
};

exports.$elseIf = function (condition, elseIfBlock) {
  return (scope = getTopLevelScope()) => {
    if (condition(scope)) {
      elseIfBlock(scope);
      return false;
    } else {
      return true;
    }
  };
};
