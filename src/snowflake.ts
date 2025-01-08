import { AvalancheConfig } from './avalancheConfig.js';
import { getMask } from './helpers.js';

export class Snowflake {
  public snowflakeId: bigint;
  public timestamp: bigint;
  public machineId: number;
  public sequence: number;

  private configuration: AvalancheConfig;

  private readonly maskGenerator: bigint = getMask(10);
  private readonly maskSequence: bigint = getMask(12);
  private readonly shiftTime: bigint = BigInt(22);

  /**
   * Initializes a new instance using a snowflake ID and an optional configuration.
   *
   * @param {bigint | string} snowflakeId - The snowflake ID as a `bigint` or `string`.
   * @param {AvalancheConfig} [configuration=new AvalancheConfig()] - The configuration to use for creating the instance. Defaults to a new `AvalancheConfig` instance.
   */
  constructor(
    snowflakeId: bigint | string,
    configuration: AvalancheConfig = new AvalancheConfig(),
  ) {
    this.snowflakeId =
      typeof snowflakeId === 'string' ? BigInt(snowflakeId) : snowflakeId;
    this.timestamp = BigInt(0);
    this.machineId = 0;
    this.sequence = 0;
    this.configuration = configuration;
    this.decodeSnowflake(this.snowflakeId);
  }

  /**
   * A computed property that returns the timestamp as a `Date` object.
   *
   * @returns {Date} A `Date` object representing the timestamp.
   */
  public get time(): Date {
    return this.timestampToDateTime(this.timestamp);
  }

  /**
   * Updates the configuration and decodes the snowflake ID.
   *
   * @param {AvalancheConfig} configuration - The new configuration to set.
   */
  public updateConfiguration(configuration: AvalancheConfig): void {
    this.configuration = configuration;
    this.decodeSnowflake(this.snowflakeId);
  }

  /**
   * Decodes the snowflake ID into its components.
   *
   * @param {bigint} snowflake - The snowflake ID to decode.
   */
  private decodeSnowflake(snowflake: bigint): void {
    this.timestamp = (snowflake >> this.shiftTime) + this.configuration.epoch;
    this.machineId = Number(
      (snowflake >> BigInt(AvalancheConfig.machineSequenceBits)) &
        this.maskGenerator,
    );
    this.sequence = Number(snowflake & this.maskSequence);
  }

  /**
   * Converts a timestamp to a `Date` object.
   *
   * @param {bigint} timestamp - The timestamp to convert.
   * @returns {Date} A `Date` object representing the timestamp.
   */
  private timestampToDateTime(timestamp: bigint): Date {
    return new Date(Number(timestamp));
  }
}
