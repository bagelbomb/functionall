'use strict';

const { resetTopLevelScope } = require('./lib/topLevelScope');
const keywords = require('./lib/keywords');
const operators = require('./lib/operators');
const structures = require('./lib/structures');

Object.assign(globalThis, {
  ...keywords,
  ...operators,
  ...structures,
});

module.exports = (...statements) => {
  resetTopLevelScope();

  // TODO: implement hoisting of functions by moving $function statements to the start (wouldn't work for outside calls)?
  statements.forEach(s => s());
};

// TODO: Add README
// TODO: Add Parcel
// TODO: Add unit tests
// TODO: Add more error handling
// TODO: Add function to automatically add scope?

// The goal is to implement something like the following (example from coffeescript.org), as a start:

// require('functionall');

// $let('number', 42);

// $let('opposite', true);

// $if($get('opposite'), $set('number', -42));

// $function('square', ['x'], $return($multiply($get('x'), $get('x'))));

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
//         ['x'],
//         $return($multiply($get('x'), $get('square')($get('x'))))
//       )
//     )
//   )
// );

// $function(
//   'race',
//   ['winner', $rest('runners')],
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

// Functions to Define: $let, $if, $get, $set, $function, $return, $multiply, $const, $array, $object, $entry, $rest, $and, $not, $equals, $typeOf, $call(?)
// Functions Left: $function, $return, $rest, $call(?)
