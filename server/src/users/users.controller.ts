import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { DecodedPayload } from 'src/auth/decorators/decoded-payload.decorator';
import { JwtDecodedPayload } from 'src/auth/models/jwt-decoded-payload';
import { MessageResponse } from 'src/_shared/message.response';
import { UpdateUserDto } from './models/update-user.dto';
import { UserDetails } from './models/user-details';
import { PaginatedResponse } from 'src/_shared/paginated.response';
import { Deed } from 'src/deeds/models/deed.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':userId/deeds')
  async getUserDeeds(@Param('userId') userId: string): Promise<PaginatedResponse<Deed>> {
    return await this.usersService.getUserDeeds(+userId);
  }

  @UseGuards(JwtGuard)
  @Get('me/details')
  async getMyDetails(@DecodedPayload() { id }: JwtDecodedPayload): Promise<UserDetails> {
    return await this.usersService.getUserDetails(id);
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
  async deleteMe(@DecodedPayload() { id }: JwtDecodedPayload): Promise<MessageResponse> {
    await this.usersService.deleteUserById(id);
    return { message: 'Your account successfully deleted' };
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
