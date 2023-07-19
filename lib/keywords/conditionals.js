'use strict';

const { getTopLevelScope } = require('../topLevelScope');

exports.$if = function (condition, ifBlock, ...elseStatements) {
  return (scope = getTopLevelScope()) => {
    if (condition(scope)) {
      ifBlock(scope);
    } else {
      elseStatements.every(e => e(scope));
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
