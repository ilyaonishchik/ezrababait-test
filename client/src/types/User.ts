import { Entity } from './Entity';

export type User = Entity & {
  username: string;
  email: string;
  passwordHash: string;
  verificationLink: string;
  verified: boolean;
};
