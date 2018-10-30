'use strict';

function shallowCopy(value) {
  if (Array.isArray(value)) return value.concat();
  else if (value && typeof value === 'object') return Object.assign({}, value);
  return value;
}

function checkProperty(obj, property) {
  return Object.prototype.hasOwnProperty.call(obj, property);
}

module.exports = {
  shallowCopy,
  checkProperty
};