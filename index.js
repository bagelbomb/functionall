'use strict';

const { getTopLevelScope, resetTopLevelScope } = require('./lib/topLevelScope');
const { $let, $const, $get, $set } = require('./lib/keywords/variables');
const { $if, $else, $elseIf } = require('./lib/keywords/conditionals');
const { $and, $or, $not } = require('./lib/operators/logical');
const {
  $add,
  $subtract,
  $multiply,
  $divide,
} = require('./lib/operators/arithmetic');

// TODO: Move the following to their own modules:

function $block(...statements) {
  return (scope = getTopLevelScope()) => {
    const innerScope = { upperScope: scope };

    // implement hoisting of functions by moving $function statements to the start (wouldn't work for top level)?
    statements.forEach(s => s(innerScope));
  };
}

function $array(...items) {
  return (scope = getTopLevelScope()) => {
    return items.map(item => (typeof item === 'function' ? item(scope) : item));
  };
}

// TODO: Add scopes to the following functions and call any parameters that can be functions with the current scope:

function $entry(key, value) {
  if (value) {
    return { [key]: value };
  } else {
    return { [key]: $get(key) };
  }
}

function $object(...entries) {
  return Object.assign({}, ...entries);
}

function $equals(value1, value2) {
  return value1 === value2;
}

function $looseEquals(value1, value2) {
  return value1 == value2;
}

function $typeof(value) {
  return typeof value;
}

Object.assign(globalThis, {
  $let,
  $const,
  $get,
  $set,
  $if,
  $else,
  $elseIf,
  $and,
  $or,
  $not,
  $block,
  $add,
  $subtract,
  $multiply,
  $divide,
  $array,
  $entry,
  $object,
  $equals,
  $looseEquals,
  $typeof,
});

module.exports = resetTopLevelScope;

// The goal is to implement something like the following (example from coffeescript.org), as a start:

// require('functionall');

// $let('number', 42);

// $let('opposite', true);

// $if($get('opposite'), $set('number', -42));

// $function('square', 'x', $return($multiply($get('x'), $get('x'))));

// $const('list', $array(1, 2, 3, 4, 5));

// $const(
//   'math',
//   $object(
//     $entry('root', $get(Math, 'sqrt')),
//     $entry('square'),
//     $entry(
//       'cube',
//       $function(
//         null,
//         'x',
//         $return($multiply($get('x'), $get('square')($get('x'))))
//       )
//     )
//   )
// );

// $function(
//   'race',
//   'winner',
//   $rest('runners'),
//   $return($get('print')($get('winner'), $get('runners')))
// );

// $if(
//   $and(
//     $not($equals($typeOf($get('elvis')), 'undefined')),
//     $not($equals($get('elvis'), null))
//   ),
//   $get('alert')('I knew it!')
// );

// $const('cubes', $get('list', 'map')($get('math', 'cube')));

// Functions to Define: $let, $if, $get, $set, $function, $return, $multiply, $const, $array, $object, $entry, $rest, $and, $not, $equals, $typeof, $call(?)
