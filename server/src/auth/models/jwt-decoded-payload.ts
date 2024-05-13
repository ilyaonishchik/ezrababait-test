import { JwtPayload } from './jwt-payload';

export class JwtDecodedPayload extends JwtPayload {
  iat: number;
}
