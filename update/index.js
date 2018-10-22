'use strict';

const util = require('../common/util');

const SET = '$set';
const PUSH = '$push';
const UNSHIFT = '$unshift';
const MERGE = '$merge';
const APPLY = '$apply';

const BEHAVIOR_LIST = [
  SET,
  PUSH,
  UNSHIFT,
  MERGE,
  APPLY
];

function update(state, behavior) {
  let nextState = util.shallowCopy(state);

  if (util.checkProperty(behavior, SET)) return behavior[SET];
  else if (util.checkProperty(behavior, PUSH)) behavior[PUSH].forEach(item => nextState.push(item));
  else if (util.checkProperty(behavior, UNSHIFT)) behavior[UNSHIFT].forEach(item => nextState.unshift(item));
  else if (util.checkProperty(behavior, MERGE)) Object.assign(nextState, behavior[MERGE]);
  if (util.checkProperty(behavior, APPLY)) nextState = behavior[APPLY](nextState);
  
  for (let b in behavior) {
    if (BEHAVIOR_LIST.findIndex(l => l === b) < 0) nextState[b] = update(state[b], behavior[b]);
  }
  return nextState;
}

module.exports = update;
