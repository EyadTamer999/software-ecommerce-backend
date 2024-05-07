/* eslint-disable prettier/prettier */
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context);
    }



    handleRequest(err: any, user: any, info: any) {
        if (err || !user) {
            console.log('Error:', err);
            throw err || new Error('Unauthorized access');
        }
        return user;
    }
   
}  