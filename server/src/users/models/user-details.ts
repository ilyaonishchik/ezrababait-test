import { User } from './user.entity';

export type UserDetails = Pick<User, 'id' | 'email' | 'username'> & {
  followersCount: number;
  followingsCount: number;
  deedsCount: number;
};
