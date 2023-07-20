'use strict';

const { $let, $const, $get, $set } = require('./variables');
const { $if, $else, $elseIf } = require('./conditionals');

module.exports = {
  $let,
  $const,
  $get,
  $set,
  $if,
  $else,
  $elseIf,
};
