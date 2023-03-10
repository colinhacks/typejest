<p align="center">
  <h1 align="center">🦆<br/><code>typejest</code></h1>
  <p align="center">
    Delightful type assertions with a Jest-like API
  </p>
</p>
<br/>
<p align="center">
<a href="https://github.com/colinhacks/typejest/actions?query=branch%3Amain"><img src="https://github.com/colinhacks/typejest/actions/workflows/test.yml/badge.svg?event=push&branch=main" alt="typejest CI status" /></a>
<a href="https://twitter.com/colinhacks" rel="nofollow"><img src="https://img.shields.io/badge/created%20by-@colinhacks-4BBAAB.svg" alt="Created by Colin McDonnell"></a>
<a href="https://opensource.org/licenses/MIT" rel="nofollow"><img src="https://img.shields.io/github/license/colinhacks/typejest" alt="License"></a>
<!-- <a href="https://www.npmjs.com/package/typejest" rel="nofollow"><img src="https://img.shields.io/npm/dw/typejest.svg" alt="npm"></a> -->
<a href="https://www.npmjs.com/package/typejest" rel="nofollow"><img src="https://img.shields.io/github/stars/colinhacks/typejest" alt="stars"></a>
</p>

<br/>
<br/>

Types need tests, too! If you're application code involves generics, type inference, or conditional types, you should write tests to make sure everything is working as expected! `typejest` provides a Jest-like API for making assertions about types.

## Installation

```bash
bun add -d typejest
npm add -D typejest
yarn add -D typejest
pnpm add -D typejest
```

## Usage

First, import the `texpect` function from `typejest`.

```ts
import {texpect} from 'typejest';
```

Start by specifying an _input type_.

```ts
// you can pass in a value
texpect('tuna'); // TExpect<string>

// or pass in a type directly
texpect<string>(); // TExpect<string>
```

> Note: `texpect` is analogous to `expect` in Jest.

The returned `TExpect` object has methods that can be used to make assertions about the type. For instance, to assert that the input _exactly matches_ a certain type:

```ts
import {texpect} from 'typejest';

texpect('tuna').is<string>(); // assert value is of type
texpect<string>().is<string>(); // assert two types are equal
```

If an assertion is not true, `typejest` will throw an error.

![error message](https://user-images.githubusercontent.com/3084745/224267196-35fd4473-3977-45e1-894c-3bb77eafe7b7.png)

## API

To assert that the input _exactly matches_ a certain type:

```ts
texpect('tuna').is<string>();
texpect<string>().is<string>();
```

To assert that the input _extends_ a certain type:

```ts
const value = 'asdf';

texpect(value).extends<string | number>(); // true
texpect<string>().extends<string | number>(); // true
```

To assert that the input matches certain common types, convenience methods are provided:

```ts
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
```

### Object types

The following helpers are available for _object types_. These helpers transform the input type and return a new `TExpect` instance. They _do not_ make any assertions about the type.

```ts
type Dog = {name: string; age?: number};

texpect<Dog>().partial; // TExpect<Partial<Dog>>
texpect<Dog>().required; // TExpect<Partial<Dog>>
texpect<Dog>().keyof; // TExpect<keyof Dog>

texpect<Dog>().pick<'name'>; // TExpect<Pick<Dog, "name">>
texpect<Dog>().pick('name'); // TExpect<Pick<Dog, "name">>

texpect<Dog>().omit<'name'>; // TExpect<Omit<Dog, "name">>
texpect<Dog>().omit('name'); // TExpect<Omit<Dog, "name">>
```

These helpers can be used in conjunction with the assertion methods:

```ts
texpect<Dog>.pick("name").is<{ name: string }>();
texpect<Dog>.partial.is<{ name?: string; age?: number; }>();
texpect<Dog>.keyof.is<"name" | "age">();
```

### Tuple types

The following assertion methods are available for _tuple types_:

```ts
const value = ['string', 234] as const;

texpect<typeof value>().first<'string'>();
texpect<typeof value>().last<234>();
```

### Object types

The following assertion methods are available for _function types_:

```ts
function length(arg: string) {
  return arg.length;
}

texpect<typeof length>().returns<number>();
texpect<typeof length>().accepts<[string]>();
```

## Development

Made by [@colinhacks](https://twitter.com/colinhacks). MIT licensed. Contributions welcome!
