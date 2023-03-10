<p align="center">
  <h1 align="center">🦆</h1>
  <h1 align="center"><code>Typejest</code></h1>
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

**Types need tests, too! Typejest is a Jest-like assertion library for static types.**

## Installation

```bash
bun add -d typejest
npm add -D typejest
yarn add -D typejest
pnpm add -D typejest
```

## Usage

First, import the `declare` function from `typejest`.

```ts
import {declare} from 'typejest';
```

Start by specifying an _input type_.

```ts
// you can pass in a value
declare('tuna'); // Declare<string>

// or pass in a type directly
declare<string>(); // Declare<string>
```

> Note: `declare` is analogous to `expect` in Jest.

The returned `Declare` object has a bunch of methods that can be usd to make assertions about the type.

To assert that the input _exactly matches_ a certain type:

```ts
import {declare} from 'typejest';

declare('tuna').is<string>(); // assert value is of type
declare<string>().is<string>(); // assert two types are equal
```

If a declaration is not true, `typejest` will throw an error.

![error message](https://user-images.githubusercontent.com/3084745/224267196-35fd4473-3977-45e1-894c-3bb77eafe7b7.png)

## API

To assert that the input _exactly matches_ a certain type:

```ts
declare('tuna').is<string>();
declare<string>().is<string>();
```

To assert that the input _extends_ a certain type:

```ts
const value = 'asdf';

declare(value).extends<string | number>(); // true
declare<string>().extends<string | number>(); // true
```

To assert that the input matches certain common types, convenience methods are provided:

```ts
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
```

### Object types

The following helpers are available for _object types_. These helpers transform the input type and return a new `Declare` instance. They _do not_ make any assertions about the type.

```ts
type Dog = {name: string; age?: number};

declare<Dog>().partial; // Declare<Partial<Dog>>
declare<Dog>().required; // Declare<Partial<Dog>>
declare<Dog>().keyof; // Declare<keyof Dog>

declare<Dog>().pick<'name'>; // Declare<Pick<Dog, "name">>
declare<Dog>().pick('name'); // Declare<Pick<Dog, "name">>

declare<Dog>().omit<'name'>; // Declare<Omit<Dog, "name">>
declare<Dog>().omit('name'); // Declare<Omit<Dog, "name">>
```

These helpers can be used in conjunction with the assertion methods:

```ts
declare<Dog>.pick("name").is<{ name: string }>();
declare<Dog>.partial.is<{ name?: string; age?: number; }>();
declare<Dog>.keyof.is<"name" | "age">();
```

### Tuple types

The following assertion methods are available for _tuple types_:

```ts
const value = ['string', 234] as const;

declare<typeof value>().first<'string'>();
declare<typeof value>().last<234>();
```

### Object types

The following assertion methods are available for _function types_:

```ts
function length(arg: string) {
  return arg.length;
}

declare<typeof length>().returns<number>();
declare<typeof length>().accepts<[string]>();
```

## Development

Made by [@colinhacks](https://twitter.com/colinhacks). MIT licensed. Contributions welcome!
