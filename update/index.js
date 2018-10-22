'use strict';

function update(state, behavior) {
  let nextState = Object.assign({}, state);
  for (let b in behavior) {
    if (b !== '$set') nextState[b] = update(state[b], behavior[b]);
  }
  return nextState;
}

module.exports = update;
