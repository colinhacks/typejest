interface declare {
  <A>(value?: A): Declare<A>;
}

type Writable<T> = {
  -readonly [P in keyof T]: T[P];
};

type Declare<A> = {
  readonly: Declare<Readonly<A>>;
  writable: Declare<Writable<A>>;
  awaited: Declare<Awaited<A>>;
  is<B>(
    ...TYPES_DO_NOT_MATCH: isExact<A, B> extends true ? [undefined?] : [never]
  ): void;
  extends<B>(
    ...TYPES_DO_NOT_MATCH: A extends B ? [undefined?] : ["types don't match"]
  ): void;
  true(
    ...TYPES_DO_NOT_MATCH: isExact<A, true> extends true
      ? []
      : ["types don't match"]
  ): void;
  false(
    ...TYPES_DO_NOT_MATCH: isExact<A, true> extends true
      ? []
      : ["types don't match"]
  ): void;
  boolean(
    ...TYPES_DO_NOT_MATCH: isExact<A, boolean> extends true
      ? []
      : ["types don't match"]
  ): void;
  number(
    ...TYPES_DO_NOT_MATCH: isExact<A, number> extends true
      ? []
      : ["types don't match"]
  ): void;
  string(
    ...TYPES_DO_NOT_MATCH: isExact<A, string> extends true
      ? []
      : ["types don't match"]
  ): void;
  symbol(
    ...TYPES_DO_NOT_MATCH: isExact<A, symbol> extends true
      ? []
      : ["types don't match"]
  ): void;
  bigint(
    ...TYPES_DO_NOT_MATCH: isExact<A, bigint> extends true
      ? []
      : ["types don't match"]
  ): void;
  object(
    ...TYPES_DO_NOT_MATCH: isExact<A, object> extends true
      ? []
      : ["types don't match"]
  ): void;
  tuple(
    ...TYPES_DO_NOT_MATCH: A extends []
      ? []
      : A extends readonly [any, ...any[]]
      ? []
      : ["types don't match"]
  ): void;
  function(
    ...TYPES_DO_NOT_MATCH: A extends (...args: any[]) => any
      ? []
      : ["types don't match"]
  ): void;
  array(
    ...TYPES_DO_NOT_MATCH: A extends Readonly<any[]>
      ? []
      : ["types don't match"]
  ): void;
  null(
    ...TYPES_DO_NOT_MATCH: isExact<A, null> extends true
      ? []
      : ["types don't match"]
  ): void;
  undefined(
    ...TYPES_DO_NOT_MATCH: isExact<A, undefined> extends true
      ? []
      : ["types don't match"]
  ): void;
  never(
    ...TYPES_DO_NOT_MATCH: isNever<A> extends true ? [] : ["types don't match"]
  ): void;
  unknown(
    ...TYPES_DO_NOT_MATCH: isUnknown<A> extends true
      ? []
      : ["types don't match"]
  ): void;
  any(
    ...TYPES_DO_NOT_MATCH: isAny<A> extends true ? [] : ["types don't match"]
  ): void;
  void(
    ...TYPES_DO_NOT_MATCH: isExact<A, void> extends true
      ? []
      : ["types don't match"]
  ): void;
} & objectDeclaration<A> &
  tupleDeclaration<A> &
  functionDeclaration<A>;

type objectDeclaration<A> = isNever<A> extends true
  ? unknown
  : isAny<A> extends true
  ? unknown
  : A extends object
  ? {
      keyof: Declare<keyof A>;
      required: Declare<Required<A>>;
      partial: Declare<Partial<A>>;
      omit<B extends keyof A>(...args: B[]): Declare<Omit<A, B>>;
      pick<B extends keyof A>(...args: B[]): Declare<Pick<A, B>>;
    }
  : {};

type tupleDeclaration<A> = isNever<A> extends true
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
      ): void;
      last<B>(
        ...TYPES_DO_NOT_MATCH: Writable<A> extends [...any[], infer Last]
          ? isExact<Last, B> extends true
            ? [undefined?]
            : [never]
          : [never]
      ): void;
    }
  : {};

type functionDeclaration<A> = isNever<A> extends true
  ? unknown
  : isAny<A> extends true
  ? unknown
  : A extends (...args: infer Args) => infer Returns
  ? {
      returns<B>(
        ...TYPES_DO_NOT_MATCH: isExact<Returns, B> extends true
          ? [undefined?]
          : [never]
      ): void;
      accepts<B extends any[]>(
        ...TYPES_DO_NOT_MATCH: isExact<Args, B> extends true
          ? [undefined?]
          : [never]
      ): void;
    }
  : {};

export const typeduck = ((_value?: any) => {
  return new DeclareClass();
}) as any as declare;

class DeclareClass {
  is = () => undefined;
  extends = () => undefined;
  true = () => undefined;
  false = () => undefined;
  boolean = () => undefined;
  number = () => undefined;
  string = () => undefined;
  symbol = () => undefined;
  bigint = () => undefined;
  object = () => undefined;
  function = () => undefined;
  array = () => undefined;
  tuple = () => undefined;
  null = () => undefined;
  undefined = () => undefined;
  never = () => undefined;
  unknown = () => undefined;
  any = () => undefined;
  void = () => undefined;
  readonly = this;
  writable = this;
  awaited = this;

  // object
  pick = () => this;
  omit = () => this;
  keyof = this;
  required = this;
  partial = this;

  // tuple
  first = () => undefined;
  last = () => undefined;

  // function
  returns = () => undefined;
  accepts = () => undefined;
}

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
