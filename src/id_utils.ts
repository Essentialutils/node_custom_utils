/**
 * Represents a class for generating Snowflake and Unique IDs.
 */
export class ID {
  // Unix timestamp for 2021-07-01T00:00:00Z
  private static readonly EPOCH = 1625097600000;

  // Number of bits for the machine ID and sequence number
  private static readonly MACHINE_ID_BITS = 5;
  private static readonly SEQUENCE_BITS = 12;

  // Maximum values for machine ID and sequence
  private static readonly MAX_MACHINE_ID = (1 << ID.MACHINE_ID_BITS) - 1;
  private static readonly MAX_SEQUENCE = (1 << ID.SEQUENCE_BITS) - 1;

  // Last timestamp and sequence number used in the generator
  private static lastTimestamp = -1;
  private static sequence = 0;

  // The machine ID associated with this instance
  private machineId: number;

  /**
   * Creates an instance of OMS_ID with the specified machine ID.
   * @param machineId The machine ID for generating Snowflake IDs.
   * @throws An error if the machine ID is not within the valid range.
   */
  constructor(machineId: number) {
    if (machineId < 0 || machineId > ID.MAX_MACHINE_ID) {
      throw new Error(
        `Machine ID should be between 0 and ${ID.MAX_MACHINE_ID}`
      );
    }
    this.machineId = machineId;
  }

  /**
   * Waits for the next millisecond if the provided timestamp is in the past.
   * @param lastTimestamp The previous timestamp.
   * @returns The current timestamp.
   */
  private static waitNextMilles(lastTimestamp: number): number {
    let timestamp = Date.now();
    while (timestamp <= lastTimestamp) {
      timestamp = Date.now();
    }
    return timestamp;
  }

  /**
   * Generates a Snowflake ID.
   * @returns A unique Snowflake ID.
   * @throws An error if the clock moves backwards.
   */
  public getSnowflakeID(): string {
    // Calculate the timestamp relative to the defined epoch
    let timestamp = Date.now() - ID.EPOCH;

    if (timestamp < ID.lastTimestamp) {
      throw new Error("Clock moved backwards. Rejecting request.");
    }

    if (timestamp === ID.lastTimestamp) {
      // Increment the sequence number if within the same millisecond
      ID.sequence = (ID.sequence + 1) & ID.MAX_SEQUENCE;
      if (ID.sequence === 0) {
        // Wait for the next millisecond if sequence overflows
        timestamp = ID.waitNextMilles(ID.lastTimestamp);
      }
    } else {
      // Reset sequence number for a new millisecond
      ID.sequence = 0;
    }

    // Update the last timestamp
    ID.lastTimestamp = timestamp;

    // Combine the components to form the Snowflake ID
    const id =
      (BigInt(timestamp) << BigInt(ID.MACHINE_ID_BITS + ID.SEQUENCE_BITS)) |
      (BigInt(this.machineId) << BigInt(ID.SEQUENCE_BITS)) |
      BigInt(ID.sequence);

    return `${id}`;
  }

  /**
   * Generates a unique ID combining the current timestamp and a random string.
   * @returns A unique ID.
   */
  public getUniqueID = (
    length: number = 4,
    timeStamp: boolean = true
  ): string => {
    // Get the current timestamp
    const timestamp = Date.now();

    // Define a function to generate a random string
    const randomStr = (length: number) => {
      const characters =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let randomString = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
      }
      return randomString;
    };

    // Combine timestamp and random string to create a unique ID
    return `${timeStamp ? timestamp.toString(36) : ""}${randomStr(length)}`;
  };
}
