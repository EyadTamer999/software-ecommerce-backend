/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppService } from 'src/app.service';
import * as dotenv from 'dotenv';

dotenv.config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AppService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          return req.cookies ? req.cookies.accessToken : null;
        },
      ]),
      secretOrKey: process.env.JWT_SECRET, // Replace with your actual JWT secret
    });
  }

  async validate(payload: any) {
    return await this.authService.validateToken(payload.accessToken);
  }
}
