import { Body, Controller, Get, HttpCode, Param, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './models/sign-up.dto';
import { Response } from 'express';
import { ACCESS_TOKEN_COOKIE_MAX_AGE } from './constants';
import { SignInDto } from './models/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto, @Res({ passthrough: true }) response: Response) {
    const accessToken = await this.authService.signUp(signUpDto);
    response.cookie('accessToken', accessToken, { maxAge: ACCESS_TOKEN_COOKIE_MAX_AGE, httpOnly: true });
    return { message: "You're successfully signed up" };
  }

  @Get('verify/:verificationLink')
  async verify(@Param('verificationLink') verificationLink: string, @Res() response: Response) {
    await this.authService.verify(verificationLink);
    response.redirect(process.env.CLIENT_URL);
  }

  @Post('sign-in')
  @HttpCode(200)
  async signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) response: Response) {
    const accessToken = await this.authService.signIn(signInDto);
    response.cookie('accessToken', accessToken, { maxAge: ACCESS_TOKEN_COOKIE_MAX_AGE, httpOnly: true });
    return { message: "You're successfully signed in" };
  }
}
