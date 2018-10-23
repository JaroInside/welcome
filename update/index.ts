'use strict';

import { shallowCopy, checkProperty } from '../common/util';

interface UpdateCommand {
  $set?: any;
  $push?: any[];
  $merge?: {};
  $unshift?: any[];
  $apply?(value: any): any;
  $splice?: any[][];
}

interface UpdatePath {
  [key: string]: UpdateBehavior;
}

type UpdateState = Array<any> | Object;

type UpdateBehavior = UpdateCommand | UpdatePath;

const SET: string = '$set';
const PUSH: string = '$push';
const UNSHIFT: string = '$unshift';
const MERGE: string = '$merge';
const APPLY: string = '$apply';
const SPLICE: string = '$splice';

const BEHAVIOR_LIST: Array<string> = [
  SET,
  PUSH,
  UNSHIFT,
  MERGE,
  APPLY,
  SPLICE
];

function update(state: UpdateState, behavior: UpdateBehavior): UpdateState {
  let nextState = shallowCopy(state);

  if (checkProperty(behavior, SET)) {
    return behavior[SET];
  } else if (checkProperty(behavior, PUSH)) {
    behavior[PUSH].forEach((item: any): void => nextState.push(item));
  } else if (checkProperty(behavior, UNSHIFT)) {
    behavior[UNSHIFT].forEach((item: any): void => nextState.unshift(item));
  } else if (checkProperty(behavior, MERGE)) {
    (<any> Object).assign(nextState, behavior[MERGE]);
  } else if (checkProperty(behavior, APPLY)) {
    nextState = behavior[APPLY](nextState);
  } else if (checkProperty(behavior, SPLICE)) {
    behavior[SPLICE].forEach((args: any): void => nextState.splice.apply(nextState, args));
  }
  
  for (let b in behavior) {
    if (BEHAVIOR_LIST.findIndex((l: string): boolean => l === b) < 0) {
      nextState[b] = update(state[b], behavior[b]);
    }
  }
  return nextState;
}

export = update;
