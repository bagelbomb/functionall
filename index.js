'use strict';

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

// Functions to Define: $let, $if, $get, $set, $function, $return, $multiply, $const, $array, $object, $entry, $rest, $and, $not, $equals, $typeof

const topLevelScope = {};

function $let(name, value) {
  return (scope = topLevelScope) => {
    if (scope[name]) {
      throw new SyntaxError(`Identifier '${name}' has already been declared`);
    } else {
      scope[name] = { type: 'let', value };
    }
  };
}

function $const(name, value) {
  return (scope = topLevelScope) => {
    if (scope[name]) {
      throw new SyntaxError(`Identifier '${name}' has already been declared`);
    } else {
      if (value) {
        scope[name] = { type: 'const', value };
      } else {
        throw new SyntaxError('Missing initializer in const declaration');
      }
    }
  };
}

function recursiveGetProp(obj, keys) {
  if (keys.length === 0) {
    return obj;
  }

  return recursiveGetProp(obj[keys[0]], keys.slice(1));
}

function recursiveLookup(name, currentScope) {
  if (currentScope[name]) {
    return currentScope[name];
  }

  if (!currentScope.upperScope) {
    return undefined;
  }

  return recursiveLookup(name, currentScope.upperScope);
}

function $get(name, ...keys) {
  return (scope = topLevelScope) => {
    if (typeof name === 'string') {
      const variable = recursiveLookup(name, scope);

      if (!variable) {
        throw new ReferenceError(`${name} is not defined`);
      }

      return keys.length
        ? recursiveGetProp(variable.value, keys)
        : variable.value;
    }

    return recursiveGetProp(name, keys);
  };
}

function $set(name, value) {
  return (scope = topLevelScope) => {
    const variable = recursiveLookup(name, scope);

    if (!variable) {
      throw new ReferenceError(`${name} is not defined`);
      // choosing to follow strict mode here (no global variables)
    }

    if (variable.type === 'const') {
      throw new TypeError('Assignment to constant variable.');
    }

    variable.value = value;
  };
}

function $block(...statements) {
  return (scope = topLevelScope) => {
    const innerScope = { upperScope: scope };

    // implement hoisting of functions by moving $function statements to the start (wouldn't work for top level)?
    statements.forEach(s => s(innerScope));
  };
}

function $if(condition, ifBlock, ...elseStatements) {
  return (scope = topLevelScope) => {
    if (condition(scope)) {
      ifBlock(scope);
    } else {
      elseStatements.every(e => e(scope));
    }
  };
}

function $else(elseBlock) {
  return (scope = topLevelScope) => {
    elseBlock(scope);
    return false;
  };
}

function $elseIf(condition, elseIfBlock) {
  return (scope = topLevelScope) => {
    if (condition(scope)) {
      elseIfBlock(scope);
      return false;
    } else {
      return true;
    }
  };
}

// function $function(...args) {
//   return (scope = topLevelScope) => {
//     const name = args[0];
//     const params = args.slice(1, -1);
//     const functionBlock = args[args.length - 1];

//     // choosing to follow strict mode here (block-scoped functions)

//     // enable redeclaring functions?
//   };
// }

// The following functions need to call some parameters with the appropriate scope:

function $multiply(...nums) {
  return nums.reduce((acc, n) => acc * n, 1);
}

function $array(...items) {
  return [...items];
}

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

function $and(...conditions) {
  return conditions.every(c => c);
}

function $or(...conditions) {
  return conditions.some(c => c);
}

function $not(condition) {
  return !condition;
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
  $multiply,
  $array,
  $entry,
  $object,
  $and,
  $or,
  $not,
  $equals,
  $looseEquals,
  $typeof,
  $if,
});
