import { AvalancheConfig } from './avalancheConfig.js';
import { generateTimestamp, waitUntilNextTimestamp } from './helpers.js';

export class Avalanche {
  private static _configuration: AvalancheConfig;

  public static readonly shiftTime: number = 10 + 12;
  public static readonly shiftGenerator: number = 10;

  private static maxSequence: number =
    (1 << AvalancheConfig.machineSequenceBits) - 1;
  private static lastTimestamp: bigint | undefined = undefined;
  private static sequence: bigint = BigInt(0);

  /**
   * Gets the current Avalanche configuration.
   *
   * @returns {AvalancheConfig} The current configuration.
   */
  static get configuration(): AvalancheConfig {
    return Avalanche._configuration;
  }

  /**
   * Sets the Avalanche configuration.
   *
   * @param {any} config - The new configuration to set.
   * @private
   */
  private static set configuration(config: AvalancheConfig) {
    this._configuration = config;
  }

  /**
   * Configures the Avalanche instance with the provided configuration.
   *
   * @param {any} config - The configuration to set.
   */
  static configure(config: AvalancheConfig): void {
    this.configuration = config;
  }

  /**
   * Generates a unique snowflake ID.
   *
   * This method generates a unique snowflake ID based on the current timestamp,
   * sequence number, and configuration settings. It ensures that the generated
   * ID is unique by incrementing the sequence number if the timestamp is the same
   * as the last generated timestamp. If the sequence number exceeds the maximum
   * allowed value, it waits until the next timestamp.
   *
   * @param {Date} [date=new Date()] - The date to use for generating the timestamp. Defaults to the current date.
   * @returns {bigint} The generated snowflake ID.
   * @throws {Error} If the system clock is moving backwards.
   */
  static generateSnowflake(date: Date = new Date()): bigint {
    let config = Avalanche.configuration;
    let timestamp = generateTimestamp(date);

    if (Avalanche.lastTimestamp !== undefined) {
      if (timestamp < Avalanche.lastTimestamp)
        throw new Error('Clock is moving backwards!');
    }

    if (timestamp === Avalanche.lastTimestamp) {
      Avalanche.sequence =
        (Avalanche.sequence + 1n) & BigInt(Avalanche.maxSequence);
      if (Avalanche.sequence === 0n) {
        timestamp = waitUntilNextTimestamp(timestamp);
      }
    } else {
      Avalanche.sequence = 0n;
    }

    Avalanche.lastTimestamp = timestamp;

    return (
      ((timestamp - config.epoch) << BigInt(Avalanche.shiftTime)) |
      (BigInt(config.workerId) << BigInt(Avalanche.shiftGenerator)) |
      Avalanche.sequence
    );
  }
}
