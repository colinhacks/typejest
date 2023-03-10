interface declare {
  <A>(value: A): typejest<A, A>;
  <A>(): typejest<A, never>;
}

type Writable<T> = {
  -readonly [P in keyof T]: T[P];
};

type typejest<A, V> = {
  _a: A;
  readonly: typejest<Readonly<A>, V>;
  writable: typejest<Writable<A>, V>;
  awaited: typejest<Awaited<A>, V>;
  is<B>(
    ...TYPES_DO_NOT_MATCH: isExact<A, B> extends true ? [undefined?] : [never]
  ): V;
  extends<B>(
    ...TYPES_DO_NOT_MATCH: A extends B ? [undefined?] : ["types don't match"]
  ): V;
  true(
    ...TYPES_DO_NOT_MATCH: isExact<A, true> extends true
      ? []
      : ["types don't match"]
  ): V;
  false(
    ...TYPES_DO_NOT_MATCH: isExact<A, true> extends true
      ? []
      : ["types don't match"]
  ): V;
  boolean(
    ...TYPES_DO_NOT_MATCH: isExact<A, boolean> extends true
      ? []
      : ["types don't match"]
  ): V;
  number(
    ...TYPES_DO_NOT_MATCH: isExact<A, number> extends true
      ? []
      : ["types don't match"]
  ): V;
  string(
    ...TYPES_DO_NOT_MATCH: isExact<A, string> extends true
      ? []
      : ["types don't match"]
  ): V;
  symbol(
    ...TYPES_DO_NOT_MATCH: isExact<A, symbol> extends true
      ? []
      : ["types don't match"]
  ): V;
  bigint(
    ...TYPES_DO_NOT_MATCH: isExact<A, bigint> extends true
      ? []
      : ["types don't match"]
  ): V;
  object(
    ...TYPES_DO_NOT_MATCH: isExact<A, object> extends true
      ? []
      : ["types don't match"]
  ): V;
  tuple(
    ...TYPES_DO_NOT_MATCH: A extends []
      ? []
      : A extends readonly [any, ...any[]]
      ? []
      : ["types don't match"]
  ): V;
  function(
    ...TYPES_DO_NOT_MATCH: A extends (...args: any[]) => any
      ? []
      : ["types don't match"]
  ): V;
  array(
    ...TYPES_DO_NOT_MATCH: A extends Readonly<any[]>
      ? []
      : ["types don't match"]
  ): V;
  null(
    ...TYPES_DO_NOT_MATCH: isExact<A, null> extends true
      ? []
      : ["types don't match"]
  ): V;
  undefined(
    ...TYPES_DO_NOT_MATCH: isExact<A, undefined> extends true
      ? []
      : ["types don't match"]
  ): V;
  never(
    ...TYPES_DO_NOT_MATCH: isNever<A> extends true ? [] : ["types don't match"]
  ): V;
  unknown(
    ...TYPES_DO_NOT_MATCH: isUnknown<A> extends true
      ? []
      : ["types don't match"]
  ): V;
  any(
    ...TYPES_DO_NOT_MATCH: isAny<A> extends true ? [] : ["types don't match"]
  ): V;
  void(
    ...TYPES_DO_NOT_MATCH: isExact<A, void> extends true
      ? []
      : ["types don't match"]
  ): V;
} & objectDeclaration<A, V> &
  tupleDeclaration<A, V> &
  functionDeclaration<A, V>;

type objectDeclaration<A, V> = isNever<A> extends true
  ? unknown
  : isAny<A> extends true
  ? unknown
  : A extends object
  ? {
      keyof: typejest<keyof A, V>;
      required: typejest<Required<A>, V>;
      partial: typejest<Partial<A>, V>;
      omit<B extends keyof A>(...args: B[]): typejest<Omit<A, B>, V>;
      pick<B extends keyof A>(...args: B[]): typejest<Pick<A, B>, V>;
    }
  : {};

type tupleDeclaration<A, V> = isNever<A> extends true
  ? unknown
  : isAny<A> extends true
  ? unknown
  : A extends Readonly<any[]>
  ? {
      first<B>(
        ...TYPES_DO_NOT_MATCH: A extends Readonly<[infer First, ...any[]]>
          ? isExact<First, B> extends true
            ? [undefined?]
            : [never]
          : [never]
      ): V;
      last<B>(
        ...TYPES_DO_NOT_MATCH: Writable<A> extends [...any[], infer Last]
          ? isExact<Last, B> extends true
            ? [undefined?]
            : [never]
          : [never]
      ): V;
    }
  : {};

type functionDeclaration<A, V> = isNever<A> extends true
  ? unknown
  : isAny<A> extends true
  ? unknown
  : A extends (...args: infer Args) => infer Returns
  ? {
      returns<B>(
        ...TYPES_DO_NOT_MATCH: isExact<Returns, B> extends true
          ? [undefined?]
          : [never]
      ): V;
      accepts<B extends any[]>(
        ...TYPES_DO_NOT_MATCH: isExact<Args, B> extends true
          ? [undefined?]
          : [never]
      ): V;
    }
  : {};

export const declare = ((_value?: any) => {
  return {
    is: () => this,
    satisfies: () => this,
  };
}) as any as declare;

const arg = declare<never>();

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
