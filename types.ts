import {hopefully} from './mod.js';

hopefully<string>().extends<any>();
hopefully<number>().is<number>();
hopefully(5).is<number>();
hopefully<number>().is(45);
// @ts-expect-error
hopefully<number>('asdf');
// @ts-expect-error
hopefully<number>().is<string>();
// @ts-expect-error
hopefully<number>().is('asdf');
// @ts-expect-error
hopefully<any>().is<number>();
// @ts-expect-error
hopefully<number>().is<any>();

hopefully('asdf').string();
hopefully(123).number();
hopefully(true).boolean();
hopefully(false).boolean();
hopefully(Symbol()).symbol();
hopefully(BigInt(123)).bigint();
hopefully({}).object();
hopefully(() => {}).function();
hopefully<any[]>().array();
hopefully<[string, number]>().tuple();
hopefully(null).null();
hopefully(undefined).undefined();
hopefully<never>().never();
hopefully<unknown>().unknown();
hopefully<void>().void();
