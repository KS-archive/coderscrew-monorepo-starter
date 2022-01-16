import argon2 from 'argon2';

export const hashPassword = argon2.hash;

export const checkPasswordsMatch = argon2.verify;
