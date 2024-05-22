/* eslint-disable prettier/prettier */
// kafka-interceptor.ts
<<<<<<< HEAD
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
=======
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException } from '@nestjs/common';
>>>>>>> e4cc43b3 (Initial)
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtAuthGuard } from './jwt-auth.guard';
import { InvalidToken } from '../exceptions/Invalidtoken';

@Injectable()
export class KafkaInterceptor implements NestInterceptor {
  constructor(private readonly jwtGuard: JwtAuthGuard) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    console.log('KafkaInterceptor d5lna hna');
    const canActivate = await this.jwtGuard.canActivate(context);
    if (!canActivate) {
      throw new InvalidToken();
    }

    return next.handle().pipe(map(data => data));
  }
}
