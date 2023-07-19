'use strict';

const { getTopLevelScope } = require('../topLevelScope');

exports.$add = function (...nums) {
  return (scope = getTopLevelScope()) => {
    return nums
      .slice(1)
      .reduce(
        (acc, num) =>
          typeof num === 'function' ? acc + num(scope) : acc + num,
        nums[0]
      );
  };
};

exports.$subtract = function (...nums) {
  return (scope = getTopLevelScope()) => {
    return nums
      .slice(1)
      .reduce(
        (acc, num) =>
          typeof num === 'function' ? acc - num(scope) : acc - num,
        nums[0]
      );
  };
};

exports.$multiply = function (...nums) {
  return (scope = getTopLevelScope()) => {
    return nums
      .slice(1)
      .reduce(
        (acc, num) =>
          typeof num === 'function' ? acc * num(scope) : acc * num,
        nums[0]
      );
  };
};

exports.$divide = function (...nums) {
  return (scope = getTopLevelScope()) => {
    return nums
      .slice(1)
      .reduce(
        (acc, num) =>
          typeof num === 'function' ? acc / num(scope) : acc / num,
        nums[0]
      );
  };
};

// TODO: add exponent, modulus, postfix-increment, postfix-decrement, prefix-increment, and prefix-decrement
