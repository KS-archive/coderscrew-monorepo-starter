import { BinaryLike, randomBytes, scrypt as _scrypt, ScryptOptions } from 'node:crypto';

const HASH_LENGTH = 32;

const scrypt = (password: BinaryLike, salt: BinaryLike, keylen: number, options: ScryptOptions = {}): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    _scrypt(password, salt, keylen, options, (error, derivedKey) => (error ? reject(error) : resolve(derivedKey)));
  });

export const encodePassword = async (plainPassword: string): Promise<string> => {
  const salt = randomBytes(8).toString('hex');
  const hash = await scrypt(plainPassword, salt, HASH_LENGTH);

  return `${salt}.${hash.toString('hex')}`;
};

export const checkPasswordsMatch = async (plainPassword: string, encodedPassword: string): Promise<boolean> => {
  const [salt, storedHash] = encodedPassword.split('.');

  const hash = await scrypt(plainPassword, salt, HASH_LENGTH);

  return storedHash === hash.toString('hex');
};
