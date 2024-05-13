import { User } from '../entities';

export type UpdateUserDto = Pick<User, 'username'>;
