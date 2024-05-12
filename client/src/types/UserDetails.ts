import { User } from './User';

export type UserDetails = Pick<User, 'id' | 'email' | 'username'> & {
  followersCount: number;
  followingsCount: number;
  deedsCount: number;
  points: number;
};
