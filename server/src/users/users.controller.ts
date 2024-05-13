import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { DecodedPayload } from 'src/auth/decorators/decoded-payload.decorator';
import { JwtDecodedPayload } from 'src/auth/models/jwt-decoded-payload';
import { MessageResponse } from 'src/_shared/message.response';
import { UpdateUserDto } from './models/update-user.dto';
import { UserDetails } from './models/user-details';
import { PaginatedResponse } from 'src/_shared/paginated.response';
import { User } from './models/user.entity';
import { UserFollowingStatus } from './models/user-following-status';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get(':userId/following-status')
  async getUserFollowingStatus(
    @DecodedPayload() { id: decodedId }: JwtDecodedPayload,
    @Param('userId') userId: string,
  ): Promise<UserFollowingStatus> {
    return this.usersService.getUserFollowingStatus(decodedId, +userId);
  }

  @UseGuards(JwtGuard)
  @Get()
  async getUsers(
    @DecodedPayload() { id: decodedId }: JwtDecodedPayload,
    @Query('page') page: string | undefined,
    @Query('take') take: string | undefined,
    @Query('followerId') followerId: string | undefined,
    @Query('followingId') followingId: string | undefined,
    @Query('query') query: string | undefined,
  ): Promise<PaginatedResponse<User>> {
    return await this.usersService.getUsers(decodedId, +page, +take, +followerId, +followingId, query);
  }

  @Get(':userId/details')
  async getUserDetails(@Param('userId') userId: string): Promise<UserDetails> {
    return await this.usersService.getUserDetails(+userId);
  }

  @UseGuards(JwtGuard)
  @Put('me')
  async updateMe(
    @DecodedPayload() { id }: JwtDecodedPayload,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<MessageResponse> {
    await this.usersService.updateUserById(id, updateUserDto);
    return { message: 'Your data succesfully updated' };
  }

  @UseGuards(JwtGuard)
  @Delete('me')
  async deleteMe(
    @DecodedPayload() { id }: JwtDecodedPayload,
    @Res({ passthrough: true }) response: Response,
  ): Promise<MessageResponse> {
    await this.usersService.deleteUserById(id);
    response.clearCookie('accessToken');
    return { message: 'Your account successfully deleted' };
  }

  @UseGuards(JwtGuard)
  @Post(':userId/toggle-following')
  async toggleFollowing(
    @DecodedPayload() { id: decodedId }: JwtDecodedPayload,
    @Param('userId') userId: string,
  ): Promise<MessageResponse> {
    return await this.usersService.toggleFollowing(decodedId, +userId);
  }

  @UseGuards(JwtGuard)
  @Post(':followingId/follow')
  async follow(
    @DecodedPayload() { id }: JwtDecodedPayload,
    @Param('followingId') followingId: string,
  ): Promise<MessageResponse> {
    const following = await this.usersService.follow(id, +followingId);
    return { message: `You're now following ${following.username}` };
  }

  @UseGuards(JwtGuard)
  @Post(':followingId/unfollow')
  async unfollow(
    @DecodedPayload() { id }: JwtDecodedPayload,
    @Param('followingId') followingId: string,
  ): Promise<MessageResponse> {
    const following = await this.usersService.unfollow(id, +followingId);
    return { message: `You're no longer following the ${following.username}` };
  }
}
