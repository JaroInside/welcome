'use strict';

const util = require('../common/util');

const SET = '$set';
const PUSH = '$push';

const BEHAVIOR_LIST = [
  SET,
  PUSH
];

function update(state, behavior) {
  let nextState = util.shallowCopy(state);

  if (util.checkProperty(behavior, SET)) return behavior[SET];
  else if (util.checkProperty(behavior, PUSH)) behavior[PUSH].forEach(item => nextState.push(item));
  
  for (let b in behavior) {
    if (BEHAVIOR_LIST.findIndex(l => l === b) < 0) nextState[b] = update(state[b], behavior[b]);
  }
  return nextState;
}

module.exports = update;
