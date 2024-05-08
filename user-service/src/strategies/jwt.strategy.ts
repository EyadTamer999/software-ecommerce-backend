// /* eslint-disable prettier/prettier */
// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { AppService } from 'src/app.service';
// import * as dotenv from 'dotenv';

// dotenv.config()

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
  
//   constructor(private readonly userService: AppService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false, 
//       secretOrKey: process.env.JWT_SECRET,
//     });
//   }
 
//   async validate(payload: any) {
//     console.log('Payload:', payload); 
//     return await this.userService.validateToken(payload.token);
//   }
// }