import { declare } from './mod.js';
function length(arg) {
    return arg.length;
}
declare().extends();
declare().is();
declare(5).is();
declare().returns();
declare().accepts();
// @ts-expect-error
declare('asdf');
// @ts-expect-error
declare().is();
// @ts-expect-error
declare().is('asdf');
// @ts-expect-error
declare().is();
// @ts-expect-error
declare().is();
declare('asdf').string();
declare(123).number();
declare(true).boolean();
declare(false).boolean();
declare(Symbol()).symbol();
declare(BigInt(123)).bigint();
declare({}).object();
declare(() => { }).function();
declare().array();
declare(null).null();
declare(undefined).undefined();
declare().never();
declare().unknown();
declare().void();
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
declare().array();
// @ts-expect-error
declare('asdf').null();
// @ts-expect-error
declare('asdf').undefined();
// @ts-expect-error
declare().never();
// @ts-expect-error
declare().unknown();
// @ts-expect-error
declare().void();
declare(1243).is();
