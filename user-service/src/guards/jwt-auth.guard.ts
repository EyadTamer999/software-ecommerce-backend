/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { InvalidToken } from 'src/exceptions/Invalidtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        
        const payload = this.extractPayload(context);
        // console.log("from jwt-auth.guard: " , payload.jwtToken )
        if (!payload) {
            
            return false;
          }

          try {
            // console.log("from jwt-auth.guard d5lt el try: " , payload.jwtToken )
            await this.jwtService.verifyAsync(payload.jwtToken); 
            
            return true;
          } catch (error) {
            // console.log("from jwt-auth.guard d5lt el if: " , payload )
            throw new InvalidToken();
          }

        
    }
    private extractPayload(context: ExecutionContext): { jwtToken: string } | null {
        const kafkaContext = context.switchToRpc();
        const payload = kafkaContext.getData();
        // console.log("from jwt-auth.guard extractPayload function: " )

        // Extract token from the message payload
        return payload ? { jwtToken: payload.jwtToken } : null;
  }


    handleRequest(err: any, user: any, info: any) {
        if (err || !user) {
            console.log('Error:', err);
            throw err || new Error('Unauthorized access');
        }
        return user;
    }
   
}  