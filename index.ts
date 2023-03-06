interface hopefully {
  <A>(value?: A): matchers<A>;
}
interface matchers<A> {
  is<B>(
    arg?: B,
    ...TYPES_DO_NOT_MATCH: isExact<A, B> extends true ? [undefined?] : [never]
  ): matchers<A>;
  extends<B>(
    arg?: B,
    ...TYPES_DO_NOT_MATCH: A extends B ? [undefined?] : ["types don't match"]
  ): isExact<A, B> extends true ? matchers<A> : never & {asdf: 'asd'};
  true(
    ...TYPES_DO_NOT_MATCH: isExact<A, true> extends true
      ? []
      : ["types don't match"]
  ): matchers<A>;
  false(
    ...TYPES_DO_NOT_MATCH: isExact<A, true> extends true
      ? []
      : ["types don't match"]
  ): matchers<A>;
  boolean(
    ...TYPES_DO_NOT_MATCH: isExact<A, boolean> extends true
      ? []
      : ["types don't match"]
  ): matchers<A>;
  number(
    ...TYPES_DO_NOT_MATCH: isExact<A, number> extends true
      ? []
      : ["types don't match"]
  ): matchers<A>;
  string(
    ...TYPES_DO_NOT_MATCH: isExact<A, string> extends true
      ? []
      : ["types don't match"]
  ): matchers<A>;
  symbol(
    ...TYPES_DO_NOT_MATCH: isExact<A, symbol> extends true
      ? []
      : ["types don't match"]
  ): matchers<A>;
  bigint(
    ...TYPES_DO_NOT_MATCH: isExact<A, bigint> extends true
      ? []
      : ["types don't match"]
  ): matchers<A>;
  object(
    ...TYPES_DO_NOT_MATCH: isExact<A, object> extends true
      ? []
      : ["types don't match"]
  ): matchers<A>;
  function(
    ...TYPES_DO_NOT_MATCH: A extends (...args:any[])=>any extends true
      ? []
      : ["types don't match"]
  ): matchers<A>;
  array(
    ...TYPES_DO_NOT_MATCH: A extends any[] ? [] : ["types don't match"]
  ): matchers<A>;
  tuple(
    ...TYPES_DO_NOT_MATCH: A extends any[] ? [] : ["types don't match"]
  ): matchers<A>;
  null(
    ...TYPES_DO_NOT_MATCH: isExact<A, null> extends true
      ? []
      : ["types don't match"]
  ): matchers<A>;
  undefined(
    ...TYPES_DO_NOT_MATCH: isExact<A, undefined> extends true
      ? []
      : ["types don't match"]
  ): matchers<A>;
  never(
    ...TYPES_DO_NOT_MATCH: isNever<A> extends true ? [] : ["types don't match"]
  ): matchers<A>;
  unknown(
    ...TYPES_DO_NOT_MATCH: isUnknown<A> extends true
      ? []
      : ["types don't match"]
  ): matchers<A>;
  any(
    ...TYPES_DO_NOT_MATCH: isAny<A> extends true ? [] : ["types don't match"]
  ): matchers<A>;
  void(
    ...TYPES_DO_NOT_MATCH: isExact<A, void> extends true
      ? []
      : ["types don't match"]
  ): matchers<A>;
}

export const hopefully = ((_value?: any) => {
  return {
    is: () => this,
    satisfies: () => this,
  };
}) as any as hopefully;

Object.assign(hopefully, {
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

// t('val').is<string>(); //.toBeType<string>();
/**
 * Asserts at compile time that the provided type argument's type resolves to the expected boolean literal type.
 * @param expectTrue - True if the passed in type argument resolved to true.
 */
// export declare function assert<T extends true | false>(expectTrue: T): void;
/**
 * Asserts at compile time that the provided type argument's type resolves to true.
 */
type isTrue<T extends true> = never;
/**
 * Asserts at compile time that the provided type argument's type resolves to false.
 */
type isFalse<T extends false> = never;
/**
 * Asserts at compile time that the provided type argument's type resolves to the expected boolean literal type.
 */
type assert<T extends true | false, Expected extends T> = never;
/**
 * Checks if type `T` has the specified type `U`.
 */
type has<T, U> = isAny<T> extends true
  ? true
  : isAny<U> extends true
  ? false
  : Extract<T, U> extends never
  ? false
  : true;
/**
 * Checks if type `T` does not have the specified type `U`.
 */
type NotHas<T, U> = has<T, U> extends false ? true : false;
/**
 * Checks if type `T` is possibly null or undefined.
 */
type isNullable<T> = Extract<T, null | undefined> extends never ? false : true;
/**
 * Checks if type `T` exactly matches type `U`.
 */
type isExact<T, U> = tupleMatches<anyToBrand<T>, anyToBrand<U>> extends true
  ? tupleMatches<deepPrepareIsExact<T>, deepPrepareIsExact<U>> extends true
    ? true
    : false
  : false;
type deepPrepareIsExact<T, VisitedTypes = never> = {
  [P in keyof T]-?: isAny<T[P]> extends true
    ? anyBrand
    : deepPrepareIsExactProp<T[P], T, VisitedTypes>;
};

type deepPrepareIsExactProp<Prop, Parent, VisitedTypes> =
  Prop extends VisitedTypes
    ? Prop
    : deepPrepareIsExact<Prop, VisitedTypes | Parent>;
/**
 * Checks if type `T` is the `any` type.
 */
type isAny<T> = 0 extends 1 & T ? true : false;
/**
 * Checks if type `T` is the `never` type.
 */
type isNever<T> = [T] extends [never] ? true : false;
/**
 * Checks if type `T` is the `unknown` type.
 */
type isUnknown<T> = isNever<T> extends false
  ? T extends unknown
    ? unknown extends T
      ? isAny<T> extends false
        ? true
        : false
      : false
    : false
  : false;
type tupleMatches<T, U> = matches<[T], [U]>;
type matches<T, U> = T extends U ? (U extends T ? true : false) : false;
type anyToBrand<T> = isAny<T> extends true ? anyBrand : T;
type anyBrand = {
  __conditionalTypeChecksAny__: undefined;
};
