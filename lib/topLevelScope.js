'use strict';

let topLevelScope;

module.exports = {
  getTopLevelScope: () => topLevelScope,
  resetTopLevelScope: () => {
    topLevelScope = {};
  },
};
