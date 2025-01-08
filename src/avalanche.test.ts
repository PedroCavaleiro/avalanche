import { Avalanche } from './avalanche.js';
import { AvalancheConfig } from './avalancheConfig.js';
import { toSnowflakeCustom, toSnowflake } from './parsers.js';

import { test, expect } from 'vitest';

const snowflake = BigInt('62937765418893312');
const timestamp = BigInt('1736352732603');
const config = new AvalancheConfig(BigInt('1721347200000'), 0);
const dateString = '2025-01-08T16:12:12.603Z';

Avalanche.configure(config);

test('Generator: Valid Snowflake ID', () => {
  const date = new Date(dateString);
  expect(Avalanche.generateSnowflake(date)).toBe(snowflake);
});

test('Snowflake ID: Parse Timestamp', () => {
  expect(toSnowflakeCustom('62937765418893312', config).timestamp).toBe(
    timestamp,
  );
});

test('Snowflake ID: Parse Timestamp (Global Configuration)', () => {
  expect(toSnowflake('62937765418893312').timestamp).toBe(timestamp);
});

test('Snowflake ID: Parse Time', () => {
  expect(toSnowflakeCustom('62937765418893312', config).time.getTime()).toBe(
    new Date(dateString).getTime(),
  );
});

test('Snowflake ID: Parse Machine ID', () => {
  expect(toSnowflakeCustom('62937765418893312', config).machineId).toBe(0);
});
