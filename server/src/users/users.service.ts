import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  async follow(followerId: number, followingId: number): Promise<User> {
    const follower = await this.usersRepository.findOne({ where: { id: followerId } });
    if (!follower) throw new UnauthorizedException('User not found');
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
    if (!follower) throw new UnauthorizedException('User not found');
    const following = await this.usersRepository.findOne({
      where: { id: followingId },
      relations: { followers: true },
    });
    if (!following) throw new NotFoundException('User not found');
    following.followers = following.followers.filter((follower) => follower.id !== followerId);
    return await this.usersRepository.save(following);
  }
}
