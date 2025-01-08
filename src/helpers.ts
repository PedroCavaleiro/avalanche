/**
 * Returns a mask with the specified number of bits set to 1.
 *
 * @param {number} bits - The number of bits to set to 1.
 * @returns {bigint} A bigint value with the specified number of bits set to 1.
 */
export function getMask(bits: number): bigint {
  return (1n << BigInt(bits)) - 1n;
}

/**
 * Waits until the next timestamp that is greater than the current timestamp.
 *
 * @param {bigint} currentTimestamp - The current timestamp.
 * @returns {bigint} The next timestamp that is greater than the current timestamp.
 */
export function waitUntilNextTimestamp(currentTimestamp: bigint): bigint {
  let nextTimestamp = generateTimestamp(new Date());
  while (nextTimestamp <= currentTimestamp) {
    nextTimestamp = generateTimestamp(new Date());
  }
  return nextTimestamp;
}

/**
 * Generates a timestamp for the specified date.
 *
 * @param {Date} dateTime - The date for which to generate the timestamp.
 * @returns {bigint} A bigint value representing the timestamp for the specified date.
 */
export function generateTimestamp(dateTime: Date): bigint {
  const unixEpoch = new Date(Date.UTC(1970, 0, 1, 0, 0, 0));
  return BigInt(dateTime.getTime() - unixEpoch.getTime());
}
