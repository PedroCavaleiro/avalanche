export class AvalancheConfig {
  public workedId: number;
  public epoch: bigint;

  // These are according to spec and should not be changed
  public static readonly timestampBits: number = 41;
  public static readonly machineIdBits: number = 10;
  public static readonly machineSequenceBits: number = 12;

  /**
   * Constructs an instance of AvalancheConfig.
   *
   * @param {bigint} [epoch=BigInt(1275350400000)] - The epoch timestamp in milliseconds. Defaults to 1275350400000.
   * @param {number} [workedId=1] - The worker ID. Defaults to 1.
   */
  constructor(epoch: bigint = BigInt(1275350400000), workedId: number = 1) {
    this.workedId = workedId;
    this.epoch = epoch;
  }
}
