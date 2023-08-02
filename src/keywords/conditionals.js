'use strict';

const { withScope } = require('../utils/scope');

exports.$if = function (condition, ifBlock, ...elseStatements) {
  return withScope(scope => {
    const innerScope = { upperScope: scope };

    if (condition(scope)) {
      ifBlock(innerScope);
    } else {
      elseStatements.every(e => e(innerScope));
    }
  });
};

exports.$else = function (elseBlock) {
  return withScope(scope => {
    elseBlock(scope);
    return false;
  });
};

exports.$elseIf = function (condition, elseIfBlock) {
  return withScope(scope => {
    if (condition(scope)) {
      elseIfBlock(scope);
      return false;
    } else {
      return true;
    }
  });
};
