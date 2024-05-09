import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { DecodedPayload } from 'src/auth/decorators/decoded-payload.decorator';
import { JwtDecodedPayload } from 'src/auth/models/jwt-decoded-payload';
import { MessageResponse } from 'src/_shared/message.response';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

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
  async unfollow(@DecodedPayload() { id }: JwtDecodedPayload, @Param('followingId') followingId: string) {
    const following = await this.usersService.unfollow(id, +followingId);
    return { message: `You're no longer following the ${following.username}` };
  }
}
