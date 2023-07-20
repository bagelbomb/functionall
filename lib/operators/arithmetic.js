'use strict';

const { getTopLevelScope } = require('../topLevelScope');

exports.$add = function (...nums) {
  return (scope = getTopLevelScope()) => {
    const firstNum = typeof nums[0] === 'function' ? nums[0](scope) : nums[0];

    return nums
      .slice(1)
      .reduce(
        (acc, num) =>
          typeof num === 'function' ? acc + num(scope) : acc + num,
        firstNum
      );
  };
};

exports.$subtract = function (...nums) {
  return (scope = getTopLevelScope()) => {
    const firstNum = typeof nums[0] === 'function' ? nums[0](scope) : nums[0];

    return nums
      .slice(1)
      .reduce(
        (acc, num) =>
          typeof num === 'function' ? acc - num(scope) : acc - num,
        firstNum
      );
  };
};

exports.$multiply = function (...nums) {
  return (scope = getTopLevelScope()) => {
    const firstNum = typeof nums[0] === 'function' ? nums[0](scope) : nums[0];

    return nums
      .slice(1)
      .reduce(
        (acc, num) =>
          typeof num === 'function' ? acc * num(scope) : acc * num,
        firstNum
      );
  };
};

exports.$divide = function (...nums) {
  return (scope = getTopLevelScope()) => {
    const firstNum = typeof nums[0] === 'function' ? nums[0](scope) : nums[0];

    return nums
      .slice(1)
      .reduce(
        (acc, num) =>
          typeof num === 'function' ? acc / num(scope) : acc / num,
        firstNum
      );
  };
};

// TODO: add exponent, modulus, postfix-increment, postfix-decrement, prefix-increment, and prefix-decrement
