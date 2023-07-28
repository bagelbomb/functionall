'use strict';

module.exports = function (statements) {
  const functionStatements = [];
  const otherStatements = [];

  statements.forEach(s =>
    s.functionallFunction ? functionStatements.push(s) : otherStatements.push(s)
  );

  return functionStatements.concat(otherStatements);
};
