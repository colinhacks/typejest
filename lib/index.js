export const declare = (_value) => {
  return {
    is: () => this,
    satisfies: () => this,
  };
};

Object.assign(declare, {
  extends: () => this,
  true: () => undefined,
  false: () => undefined,
  boolean: () => undefined,
  number: () => undefined,
  string: () => undefined,
  symbol: () => undefined,
  bigint: () => undefined,
  object: () => undefined,
  function: () => undefined,
  array: () => undefined,
  tuple: () => undefined,
  null: () => undefined,
  undefined: () => undefined,
  never: () => undefined,
  unknown: () => undefined,
  any: () => undefined,
  void: () => undefined,
});
