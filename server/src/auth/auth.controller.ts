import { Body, Controller, Get, HttpCode, Param, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './models/sign-up.dto';
import { Response } from 'express';
import { ACCESS_TOKEN_COOKIE_MAX_AGE } from './constants';
import { SignInDto } from './models/sign-in.dto';
import { JwtGuard } from './guards/jwt.guard';
import { DecodedPayload } from './decorators/decoded-payload.decorator';
import { JwtDecodedPayload } from './models/jwt-decoded-payload';
import { MessageResponse } from 'src/_shared/message.response';
import { User } from 'src/users/models/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto, @Res({ passthrough: true }) response: Response): Promise<MessageResponse> {
    const accessToken = await this.authService.signUp(signUpDto);
    response.cookie('accessToken', accessToken, { maxAge: ACCESS_TOKEN_COOKIE_MAX_AGE, httpOnly: true });
    return { message: "You're successfully signed up" };
  }

  @Get('verify/:verificationLink')
  async verify(@Param('verificationLink') verificationLink: string, @Res() response: Response): Promise<void> {
    await this.authService.verify(verificationLink);
    response.redirect(process.env.CLIENT_URL);
  }

  @Post('sign-in')
  @HttpCode(200)
  async signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) response: Response): Promise<MessageResponse> {
    const accessToken = await this.authService.signIn(signInDto);
    response.cookie('accessToken', accessToken, { maxAge: ACCESS_TOKEN_COOKIE_MAX_AGE, httpOnly: true });
    return { message: "You've successfully signed in" };
  }

  @UseGuards(JwtGuard)
  @Get('me')
  async me(@DecodedPayload() jwtDecodedPayload: JwtDecodedPayload): Promise<User> {
    return await this.authService.getMe(jwtDecodedPayload);
  }

  @Post('sign-out')
  signOut(@Res({ passthrough: true }) response: Response): MessageResponse {
    response.clearCookie('accessToken');
    return { message: "You've successfully signed out" };
  }
}
