# Vladress 🧛‍♂️

[![NPM](https://nodei.co/npm/vladdress.png?mini=true)](https://npmjs.org/package/vladdress)

## Introduction

This package aims to be a simple address parsing utility. It is based off of the project [moneals/addresser](https://github.com/moneals/addresser) but re-written in TypeScript and cleaned up a bit.

### Why `vladdress`?

VLADdress is a combination of the company I work for ([Vidaloop](https://vidaloop.com/)) and the function of the package itself (address parsing!)

### Installation

If you're using NPM:

```shell
npm install vladdress
```

For yarn:
```shell
yarn add vladdress
```

## Usage

The package is simple to use, simply import it and call `parseAddress(...)` with the address you'd like to parse.

```typescript
import { parseAddress } from 'vladdress';

const result = parseAddress('123 Main Street, San Diego CA 92115');

```

### Usage Notes

- US Addresses are the best supported (PRs welcome to remedy this!)
   - Canadian addresses may also be supported, but full support may be lacking.
- Addresses with no street number should still parse correctly
- Addresses with unit number in the front should still parse correctly
- Addresses with no delimiters (`","` for example) should still parse correctly

## Contributing

Any and all contributions are welcome! Simply make a PR and we will review it! (In the future, we may have more rules on contributions).

### Testing

To test the package, run `npm run test`.

Testing is done via `mocha` and `chai` for assertions. Please run all tests before making a PR to ensure they all pass.
