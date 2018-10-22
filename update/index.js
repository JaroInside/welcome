'use strict';

function update(state, behavior) {
  let nextState = Object.assign({}, state);
  nextState.name = behavior.name['$set'];
  return nextState;
}

module.exports = update;
