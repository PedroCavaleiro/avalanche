import { Snowflake } from './snowflake.js';
import { AvalancheConfig } from './avalancheConfig.js';
import { Avalanche } from './avalanche.js';

/**
 * Converts the provided `snowflakeId` to a `Snowflake` instance using the specified `configuration`.
 *
 * @param {string | bigint} snowflakeId - The snowflake ID as a `string` or `bigint`.
 * @param {AvalancheConfig} configuration - The configuration to use for creating the `Snowflake` instance.
 * @returns {Snowflake} A `Snowflake` instance configured with the specified `configuration`.
 */
export function toSnowflakeCustom(
  snowflakeId: string | bigint,
  configuration: AvalancheConfig,
): Snowflake {
  return new Snowflake(snowflakeId, configuration);
}

/**
 * Converts the provided `snowflakeId` to a `Snowflake` instance using either the global configuration or a new instance of `AvalancheConfig`.
 *
 * @param {string | bigint} snowflakeId - The snowflake ID as a `string` or `bigint`.
 * @param {boolean} [useGlobalConfiguration=true] - A boolean value indicating whether to use the global configuration.
 * @returns {Snowflake} A `Snowflake` instance configured based on the `useGlobalConfiguration` parameter.
 */
export function toSnowflake(
  snowflakeId: string | bigint,
  useGlobalConfiguration: boolean = true,
): Snowflake {
  if (useGlobalConfiguration)
    return new Snowflake(snowflakeId, Avalanche.configuration);
  else return new Snowflake(snowflakeId, new AvalancheConfig());
}
