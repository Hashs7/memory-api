import { SignOptions, DecodeOptions } from 'jsonwebtoken';

const signOptions: SignOptions = {
  // 20 days
  expiresIn: '20d',
};

const rSignOptions: SignOptions = {
  expiresIn: '20d',
};

const rDecodeOptions: DecodeOptions = {
  json: true,
  complete: false,
};

export const jwtConstants = {
  secret: 'topSecret31',
  signOptions,
  rSignOptions,
  rDecodeOptions,
};