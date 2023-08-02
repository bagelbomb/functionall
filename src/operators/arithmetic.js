'use strict';

const { withScope, scoped } = require('../utils/scope');

exports.$add = function (...nums) {
  return withScope(scope => {
    const scopedNums = scoped(nums, scope);

    return scopedNums.slice(1).reduce((acc, num) => acc + num, scopedNums[0]);
  });
};

exports.$subtract = function (...nums) {
  return withScope(scope => {
    const scopedNums = scoped(nums, scope);

    return scopedNums.slice(1).reduce((acc, num) => acc - num, scopedNums[0]);
  });
};

exports.$multiply = function (...nums) {
  return withScope(scope => {
    const scopedNums = scoped(nums, scope);

    return scopedNums.slice(1).reduce((acc, num) => acc * num, scopedNums[0]);
  });
};

exports.$divide = function (...nums) {
  return withScope(scope => {
    const scopedNums = scoped(nums, scope);

    return scopedNums.slice(1).reduce((acc, num) => acc / num, scopedNums[0]);
  });
};

// TODO: add exponent, modulus, postfix-increment, postfix-decrement, prefix-increment, and prefix-decrement
