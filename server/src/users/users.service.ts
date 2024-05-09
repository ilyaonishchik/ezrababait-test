import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';
import { UpdateUserDto } from './models/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  async update(id: number, { username }: UpdateUserDto): Promise<void> {
    const me = await this.usersRepository.findOneBy({ id });
    if (!me) throw new UnauthorizedException("You're not authenticated");
    if (await this.isUsernameTaken(username)) throw new ConflictException('User with this username already exists');
    await this.usersRepository.update(id, { username });
  }

  async delete(id: number): Promise<void> {
    const me = await this.usersRepository.findOneBy({ id });
    if (!me) throw new UnauthorizedException("You're not authenticated");
    me.followers = [];
    me.followings = [];
    await this.usersRepository.save(me);
    await this.usersRepository.delete(id);
  }

  async follow(followerId: number, followingId: number): Promise<User> {
    const follower = await this.usersRepository.findOne({ where: { id: followerId } });
    if (!follower) throw new UnauthorizedException("You're not authenticated");
    const following = await this.usersRepository.findOne({
      where: { id: followingId },
      relations: { followers: true },
    });
    if (!following) throw new NotFoundException('User not found');
    const isFollowing = following.followers.some((follower) => follower.id === followerId);
    if (isFollowing) throw new ConflictException('You are already following this user');
    following.followers.push(follower);
    return await this.usersRepository.save(following);
  }

  async unfollow(followerId: number, followingId: number): Promise<User> {
    const follower = await this.usersRepository.findOne({ where: { id: followerId } });
    if (!follower) throw new UnauthorizedException("You're not authenticated");
    const following = await this.usersRepository.findOne({
      where: { id: followingId },
      relations: { followers: true },
    });
    if (!following) throw new NotFoundException('User not found');
    following.followers = following.followers.filter((follower) => follower.id !== followerId);
    return await this.usersRepository.save(following);
  }

  private async isUsernameTaken(username: string): Promise<boolean> {
    return !!(await this.usersRepository.findOneBy({ username }));
  }
}
