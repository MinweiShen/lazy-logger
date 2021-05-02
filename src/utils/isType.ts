/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
function getType(input: any): string {
  return {}.toString.call(input)
}

export const isFunction = (input: any): boolean => typeof input === 'function'
export const isArray = (input: any): boolean => getType(input) === '[object Array]';
export const isObject = (input: any): boolean => getType(input) === '[object Object]';
export const isString = (input: any): boolean => typeof input === 'string';