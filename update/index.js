'use strict';
var util_1 = require("../common/util");
var SET = '$set';
var PUSH = '$push';
var UNSHIFT = '$unshift';
var MERGE = '$merge';
var APPLY = '$apply';
var SPLICE = '$splice';
var BEHAVIOR_LIST = [
    SET,
    PUSH,
    UNSHIFT,
    MERGE,
    APPLY,
    SPLICE
];
function update(state, behavior) {
    var nextState = util_1.shallowCopy(state);
    if (util_1.checkProperty(behavior, SET)) {
        return behavior[SET];
    }
    else if (util_1.checkProperty(behavior, PUSH)) {
        behavior[PUSH].forEach(function (item) { return nextState.push(item); });
    }
    else if (util_1.checkProperty(behavior, UNSHIFT)) {
        behavior[UNSHIFT].forEach(function (item) { return nextState.unshift(item); });
    }
    else if (util_1.checkProperty(behavior, MERGE)) {
        Object.assign(nextState, behavior[MERGE]);
    }
    else if (util_1.checkProperty(behavior, APPLY)) {
        nextState = behavior[APPLY](nextState);
    }
    else if (util_1.checkProperty(behavior, SPLICE)) {
        behavior[SPLICE].forEach(function (args) { return nextState.splice.apply(nextState, args); });
    }
    var _loop_1 = function (b) {
        if (BEHAVIOR_LIST.findIndex(function (l) { return l === b; }) < 0) {
            nextState[b] = update(state[b], behavior[b]);
        }
    };
    for (var b in behavior) {
        _loop_1(b);
    }
    return nextState;
}
module.exports = update;
//# sourceMappingURL=index.js.map