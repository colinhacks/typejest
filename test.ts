import {typeduck} from './mod.js';

const value = 'tuna';
typeduck(value).is<string>();

typeduck<string>().extends<any>();
typeduck<number>().is<number>();
typeduck(5).is<number>();

function length(arg: string) {
  return arg.length;
}

typeduck<typeof length>().returns<number>();
typeduck<typeof length>().accepts<[string]>();

const tupleValue = ['string', 234] as const;
typeduck(tupleValue).writable.is<['string', 234]>();
typeduck(tupleValue).first<'string'>();
typeduck(tupleValue).last<234>();
typeduck(tupleValue).tuple();
typeduck<[]>().tuple();
// @ts-expect-error
typeduck<string[]>().tuple();

interface Dog {
  name: string;
  age: number;
}

typeduck<Dog>().omit('name').is<{age: number}>();
typeduck<Dog>().omit<'name'>().is<{age: number}>();
typeduck<Dog>().pick('name').is<{name: string}>();
typeduck<Dog>().partial.pick<'name'>().is<{name?: string}>();
typeduck<Dog>().keyof.is<'name' | 'age'>();

// @ts-expect-error
typeduck<number>('asdf');
// @ts-expect-error
typeduck<number>().is<string>();
// @ts-expect-error
typeduck<number>().is('asdf');
// @ts-expect-error
typeduck<any>().is<number>();
// @ts-expect-error
typeduck<number>().is<any>();

typeduck('asdf').string();
typeduck(123).number();
typeduck(true).boolean();
typeduck(false).boolean();
typeduck(Symbol()).symbol();
typeduck(BigInt(123)).bigint();
typeduck({}).object();
typeduck(() => {}).function();
typeduck<any[]>().array();
typeduck(null).null();
typeduck(undefined).undefined();
typeduck<never>().never();
typeduck<unknown>().unknown();
typeduck<void>().void();

typeduck('asdf').string();
// @ts-expect-error
typeduck('asdf').number();
// @ts-expect-error
typeduck('asdf').boolean();
// @ts-expect-error
typeduck('asdf').boolean();
// @ts-expect-error
typeduck('asdf').symbol();
// @ts-expect-error
typeduck('asdf').bigint();
// @ts-expect-error
typeduck('asdf').object();
// @ts-expect-error
typeduck('asdf').function();
// @ts-expect-error
typeduck<'asdf'>().array();
// @ts-expect-error
typeduck('asdf').null();
// @ts-expect-error
typeduck('asdf').undefined();
// @ts-expect-error
typeduck<'asdf'>().never();
// @ts-expect-error
typeduck<'asdf'>().unknown();
// @ts-expect-error
typeduck<'asdf'>().void();

typeduck(1243).is<number>();
