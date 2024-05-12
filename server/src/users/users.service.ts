import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Not, Repository } from 'typeorm';
import { User } from './models/user.entity';
import { UpdateUserDto } from './models/update-user.dto';
import { UserDetails } from './models/user-details';
import { Deed } from 'src/deeds/models/deed.entity';
import { PaginatedResponse } from 'src/_shared/paginated.response';
import { UserFollowingStatus } from './models/user-following-status';
import { MessageResponse } from 'src/_shared/message.response';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Deed) private readonly deedsRepository: Repository<Deed>,
  ) {}

  async toggleFollowing(decodedId: number, userId: number): Promise<MessageResponse> {
    if (decodedId === userId) throw new ConflictException("You can't follow/unfollow yourself");
    const decodedUser = await this.usersRepository.findOne({
      where: { id: decodedId },
      relations: { followings: true },
    });
    if (!decodedUser) throw new UnauthorizedException(`You are not authenticated`);
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User with id ${userId} not found`);
    let message;
    if (decodedUser.followings.some((following) => following.id === userId)) {
      decodedUser.followings = decodedUser.followings.filter((following) => following.id !== userId);
      message = `You're no longer following ${user.username}`;
    } else {
      decodedUser.followings.push(user);
      message = `You're following ${user.username} now`;
    }
    await this.usersRepository.save(decodedUser);
    return { message };
  }

  async getUserFollowingStatus(decodedId: number, userId: number): Promise<UserFollowingStatus> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: { followers: true, followings: true },
    });
    if (!user) throw new NotFoundException(`User with id ${userId} not found`);
    return {
      isFollowing: !!user.followers.find((follower) => follower.id === decodedId),
      isFollower: !!user.followings.find((following) => following.id === decodedId),
    };
  }

  async getUsers(
    decodedId: number,
    page: number,
    take: number,
    followerId: number,
    followingId: number,
    query: string,
  ): Promise<PaginatedResponse<User>> {
    page = page || 1;
    take = take || 10;
    return await this.usersRepository.findAndCount({
      where: {
        id: Not(decodedId),
        username: query ? ILike(`%${query}%`) : null,
        followers: followerId ? { id: followerId } : null,
        followings: followingId ? { id: followingId } : null,
      },
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
      points: user.deeds.filter((deed) => deed.completed).reduce((acc, deed) => (acc += deed.points), 0),
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
