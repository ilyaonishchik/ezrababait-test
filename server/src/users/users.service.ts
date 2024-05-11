import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';
import { UpdateUserDto } from './models/update-user.dto';
import { UserDetails } from './models/user-details';
import { PaginatedResponse } from 'src/_shared/paginated.response';
import { Deed } from 'src/deeds/models/deed.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Deed) private readonly deedsRepository: Repository<Deed>,
  ) {}

  async getUserDeeds(userId: number, page: number, take: number): Promise<PaginatedResponse<Deed>> {
    page = page || 1;
    take = take || 5;
    return await this.deedsRepository.findAndCount({
      where: { user: { id: userId } },
      skip: (page - 1) * take,
      take,
    });
  }

  async getUserDetails(userId: number): Promise<UserDetails> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: { followers: true, followings: true, deeds: true },
    });
    if (!user) throw new NotFoundException(`User with id ${userId} not found`);
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      followersCount: user.followers.length,
      followingsCount: user.followings.length,
      deedsCount: user.deeds.length,
    };
  }

  async updateUserById(id: number, { username }: UpdateUserDto): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    if (await this.isUsernameTaken(username)) throw new ConflictException('User with this username already exists');
    await this.usersRepository.update(id, { username });
  }

  async deleteUserById(id: number): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    user.followers = [];
    user.followings = [];
    await this.usersRepository.save(user);
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
