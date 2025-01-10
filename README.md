# Avalanche

[![CI and Publish](https://github.com/PedroCavaleiro/avalanche/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/PedroCavaleiro/avalanche/actions/workflows/npm-publish.yml)

A Simple TypeScript Snowflake ID library

This will allow you to generate unique IDs for your application but also parse the details back.

## Installation

To install just use npm to install the package.

```bash
npm install @pedrocavaleiro/avalanche
```

## Usage

### Generate a Snowflake ID

To generate a Snowflake ID with the default settings and for the current date just call `generateSnowflake`.

```typescript
import { Avalanche } from '@pedrocavaleiro/avalanche';

let snowflake = Avalanche.generateSnowflake();
```

You can generate for a specific date (not recommended as it might not be unique) by passing a `Date` object.

```typescript
import { Avalanche } from '@pedrocavaleiro/avalanche';

const date = new Date('2025-01-08T16:12:12.603Z');
let snowflake = Avalanche.generateSnowflake(date);
```

You can go further and specify the epoch, worker ID.

```typescript
import { Avalanche } from '@pedrocavaleiro/avalanche';

const config = {
  epoch: 1577836800000, // 2020-01-01T00:00:00.000Z
  workerId: 1,
};

Avalanche.configure(config);
let snowflake = Avalanche.generateSnowflake();
```

### Parse a Snowflake ID

To parse a Snowflake ID you can use the `toSnowflake` method or `toSnowflakeCustom` the difference is that `toSnowflakeCustom` takes a configuration to correctly parse the Snowflake ID.

Both parsers take a string or bigint as input.

```typescript
import { toSnowflake } from '@pedrocavaleiro/avalanche';

// Parse with global configuration
let snowflake = toSnowflake('62937765418893312');

// Parse with default configuration
let snowflake = toSnowflake('62937765418893312', false);

// Parse with custom configuration
let snowflake = toSnowflakeCustom('62937765418893312', myConfig);
```

## Related projects

- [SwiftySnowflake](https://github.com/PedroCavaleiro/SwiftySnowflake) - A Swift Snowflake ID library
