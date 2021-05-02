import { isArray, isFunction, isObject, isString } from '../isType';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const fn = function() {};
const obj = {};
const arr: Array<number> = [];
const inputs = [1, true, '', arr, obj, fn, new Date(), /[a-z]/];

describe('isArray', () => {
  it('should return true for an array', () => {
    expect(isArray(arr)).toBe(true);
  });
  
  it('should return false for non-array objects', () => {
    inputs.filter(v => v !== arr).forEach(v => expect(isArray(v)).toBe(false))
  });
});

describe('isFunction', () => {
  it('should return true for a function', () => {
    expect(isFunction(fn)).toBe(true);
  });
  
  it('should return false for non-function objects', () => {
    inputs.filter(v => v !== fn).forEach(v => expect(isFunction(v)).toBe(false))
  });
});

describe('isString', () => {
  it('should return true for a string', () => {
    expect(isString('')).toBe(true);
  });
  
  it('should return false for non-function objects', () => {
    inputs.filter(v => v !== '').forEach(v => expect(isString(v)).toBe(false))
  });
});

describe('isObject', () => {
  it('should return true for an object', () => {
    expect(isObject(obj)).toBe(true);
  });
  
  it('should return false for non-object objects', () => {
    inputs.filter(v => v !== obj).forEach(v => expect(isObject(v)).toBe(false))
  });
});

