import { compare, hash } from "bcryptjs";

import { IHashProvider } from "./IHashProvider";

const HASH_SALT = 8;

export class BCryptHashProvider implements IHashProvider {
  async hash(payload: string): Promise<string> {
    try {
      const hashedValue = await hash(payload, HASH_SALT);

      return hashedValue;
    } catch (err) {
      console.error(err);
    }
  }

  async compare(payload: string, hash: string): Promise<boolean> {
    const isHashEqual = await compare(payload, hash);

    return isHashEqual;
  }
}
