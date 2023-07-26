'use strict';

const { $let, $const, $get, $set } = require('./variables');
const { $if, $else, $elseIf } = require('./conditionals');
const { $function, $return, $call } = require('./functions');

module.exports = {
  $let,
  $const,
  $get,
  $set,
  $if,
  $else,
  $elseIf,
  $function,
  $return,
  $call,
};
