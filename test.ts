import {texpect} from './mod.js';

const value = 'tuna';
texpect(value).is<string>();

texpect<string>().extends<any>();
texpect<number>().is<number>();
texpect(5).is<number>();

function length(arg: string) {
  return arg.length;
}

texpect<typeof length>().returns<number>();
texpect<typeof length>().accepts<[string]>();

const tupleValue = ['string', 234] as const;
texpect(tupleValue).writable.is<['string', 234]>();
texpect(tupleValue).first<'string'>();
texpect(tupleValue).last<234>();
texpect(tupleValue).tuple();
texpect<[]>().tuple();
// @ts-expect-error
texpect<string[]>().tuple();

interface Dog {
  name: string;
  age: number;
}

texpect<Dog>().omit('name').is<{age: number}>();
texpect<Dog>().omit<'name'>().is<{age: number}>();
texpect<Dog>().pick('name').is<{name: string}>();
texpect<Dog>().partial.pick<'name'>().is<{name?: string}>();
texpect<Dog>().keyof.is<'name' | 'age'>();

// @ts-expect-error
texpect<number>('asdf');
// @ts-expect-error
texpect<number>().is<string>();
// @ts-expect-error
texpect<number>().is('asdf');
// @ts-expect-error
texpect<any>().is<number>();
// @ts-expect-error
texpect<number>().is<any>();

texpect('asdf').string();
texpect(123).number();
texpect(true).boolean();
texpect(false).boolean();
texpect(Symbol()).symbol();
texpect(BigInt(123)).bigint();
texpect({}).object();
texpect(() => {}).function();
texpect<any[]>().array();
texpect(null).null();
texpect(undefined).undefined();
texpect<never>().never();
texpect<unknown>().unknown();
texpect<void>().void();

texpect('asdf').string();
// @ts-expect-error
texpect('asdf').number();
// @ts-expect-error
texpect('asdf').boolean();
// @ts-expect-error
texpect('asdf').boolean();
// @ts-expect-error
texpect('asdf').symbol();
// @ts-expect-error
texpect('asdf').bigint();
// @ts-expect-error
texpect('asdf').object();
// @ts-expect-error
texpect('asdf').function();
// @ts-expect-error
texpect<'asdf'>().array();
// @ts-expect-error
texpect('asdf').null();
// @ts-expect-error
texpect('asdf').undefined();
// @ts-expect-error
texpect<'asdf'>().never();
// @ts-expect-error
texpect<'asdf'>().unknown();
// @ts-expect-error
texpect<'asdf'>().void();

texpect(1243).is<number>();
