'use strict';

export function shallowCopy(value: any): any {
  if (Array.isArray(value)) {
    return value.concat();
  } else if (value && typeof value === 'object') {
    return (<any> Object).assign({}, value);
  }
  return value;
}

export function checkProperty(obj: Object, property: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, property);
}
