# Vladdress 🧛‍♂️

[![NPM_VERSION](https://img.shields.io/npm/v/vladdress)](https://npmjs.org/package/vladdress)

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

```ts
import { parseAddress } from 'vladdress';

const result = parseAddress('123 Main Street, San Diego CA 92115');

```

### Return Value

The following interface is returned from the function:

| Property | Always Present? | Description |
| -------- | --- | ----------- |
| `addressLine1` | Yes | The full line 1 of the address specified. |
| `formattedAddress` | Yes | The formatted and normalized address as a human-readable output. |
| `id` | Yes | An ID generated from the name of the street that can be used for caching. |
| `placeName` | Yes | The name of the locality or city the address is in. |
| `stateAbbreviation` | Yes | The abbreviation of the state the address is in (e.g. `CA`) |
| `stateName` | Yes | The full name of the state the address is in. |
| `streetName` | Yes | The name of the street. |
| `addressLine2` | No | The full line 2 of the address specified (e.g. `"Unit 1"`) |
| `streetDirection` | No | The direcion name of the street (if applicable) (e.g. `N` in `123 N Main St.`). |
| `streetNumber` | No | The address's street number (if supplied). |
| `streetSuffix` | No | The suffix of the street name (e.g. `St.` in `Main St.`). |
| `zipCode` | No | For the US, this is this is the 5-digit ZIP code of the given address (e.g. `94021`). In Canada, this is the canadian-formatted code (`A1A-1A1`) |
| `zipCodePlusFour` | No | In the US, this is the full, 9-digit zip code of the form (`94021-2228`) |

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
