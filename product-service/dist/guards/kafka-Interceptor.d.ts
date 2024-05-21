import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from './jwt-auth.guard';
export declare class KafkaInterceptor implements NestInterceptor {
    private readonly jwtGuard;
    constructor(jwtGuard: JwtAuthGuard);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
