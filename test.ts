import {declare} from './mod.js';

const value = 'tuna';
declare(value).is<string>();

declare<string>().extends<any>();
declare<number>().is<number>();
declare(5).is<number>();

function length(arg: string) {
  return arg.length;
}

declare<typeof length>().returns<number>();
declare<typeof length>().accepts<[string]>();

const tupleValue = ['string', 234] as const;
declare(tupleValue).writable.is<['string', 234]>();
declare(tupleValue).first<'string'>();
declare(tupleValue).last<234>();
declare(tupleValue).tuple();
declare<[]>().tuple();
// @ts-expect-error
declare<string[]>().tuple();

interface Dog {
  name: string;
  age: number;
}
declare<Dog>().omit('name').is<{age: number}>();
declare<Dog>().omit<'name'>().is<{age: number}>();
declare<Dog>().pick('name').is<{name: string}>();
declare<Dog>().partial.pick<'name'>().is<{name?: string}>();

// @ts-expect-error
declare<number>('asdf');
// @ts-expect-error
declare<number>().is<string>();
// @ts-expect-error
declare<number>().is('asdf');
// @ts-expect-error
declare<any>().is<number>();
// @ts-expect-error
declare<number>().is<any>();

declare('asdf').string();
declare(123).number();
declare(true).boolean();
declare(false).boolean();
declare(Symbol()).symbol();
declare(BigInt(123)).bigint();
declare({}).object();
declare(() => {}).function();
declare<any[]>().array();
declare(null).null();
declare(undefined).undefined();
declare<never>().never();
declare<unknown>().unknown();
declare<void>().void();

declare('asdf').string();
// @ts-expect-error
declare('asdf').number();
// @ts-expect-error
declare('asdf').boolean();
// @ts-expect-error
declare('asdf').boolean();
// @ts-expect-error
declare('asdf').symbol();
// @ts-expect-error
declare('asdf').bigint();
// @ts-expect-error
declare('asdf').object();
// @ts-expect-error
declare('asdf').function();
// @ts-expect-error
declare<'asdf'>().array();
// @ts-expect-error
declare('asdf').null();
// @ts-expect-error
declare('asdf').undefined();
// @ts-expect-error
declare<'asdf'>().never();
// @ts-expect-error
declare<'asdf'>().unknown();
// @ts-expect-error
declare<'asdf'>().void();

declare(1243).is<number>();
