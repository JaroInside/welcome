'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function shallowCopy(value) {
    if (Array.isArray(value)) {
        return value.concat();
    }
    else if (value && typeof value === 'object') {
        return Object.assign({}, value);
    }
    return value;
}
exports.shallowCopy = shallowCopy;
function checkProperty(obj, property) {
    return Object.prototype.hasOwnProperty.call(obj, property);
}
exports.checkProperty = checkProperty;
//# sourceMappingURL=util.js.map