import { BinaryLike, randomBytes, scrypt as _scrypt, ScryptOptions } from 'node:crypto';

const HASH_LENGTH = 32;

const scrypt = (
  password: BinaryLike,
  salt: BinaryLike,
  keylen: number,
  options: ScryptOptions = {}
): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    _scrypt(password, salt, keylen, options, (error, derivedKey) => {
      if (error) {
        return reject(error);
      }

      return resolve(derivedKey);
    });
  });
};

export const encodePassword = async (plainPassword: string): Promise<string> => {
  const salt = randomBytes(8).toString('hex');
  const hash = await scrypt(plainPassword, salt, HASH_LENGTH);

  return `${salt}.${hash.toString('hex')}`;
};

export const checkIfPasswordsMatch = async (plainPassword: string, encodedPassword: string): Promise<boolean> => {
  const [salt, storedHash] = encodedPassword.split('.');

  const hash = await scrypt(plainPassword, salt, HASH_LENGTH);

  return storedHash === hash.toString('hex');
};
