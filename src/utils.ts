export function isObject(obj: any): obj is object {
  const type = typeof obj
  return type === 'object' && !!obj
}

export function isObjectKey(key: any): key is string | number {
  const type = typeof key
  return type === 'string' || type === 'object'
}
export function isFunction(fn: any): fn is Function {
  return typeof fn === 'function'
}
