import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './models/sign-up.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ACCESS_TOKEN_COOKIE_MAX_AGE } from './constants';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto, @Res({ passthrough: true }) response: Response) {
    const user = await this.authService.signup(signUpDto);
    const accessToken = this.jwtService.sign({ id: user.id, username: user.username, email: user.email });
    response.cookie('accessToken', accessToken, { maxAge: ACCESS_TOKEN_COOKIE_MAX_AGE, httpOnly: true });
    return { message: "You're successfully signed up" };
  }

  @Get('verify/:verificationLink')
  async verify(@Param('verificationLink') verificationLink: string, @Res() response: Response) {
    await this.authService.verify(verificationLink);
    response.redirect(process.env.CLIENT_URL);
  }
}
