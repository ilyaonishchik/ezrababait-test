import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtDecodedPayload } from '../models/jwt-decoded-payload';

export class JwtStartegy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: (req) => req.cookies['accessToken'] || ExtractJwt.fromAuthHeaderAsBearerToken()(req),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(jwtDecodedPayload: JwtDecodedPayload) {
    return jwtDecodedPayload;
  }
}
