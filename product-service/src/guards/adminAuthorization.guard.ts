/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UNAUTHORIZED } from '../exceptions/Authorization';
import { InvalidToken } from 'src/exceptions/Invalidtoken';


@Injectable()
export class AdminAuthorizationGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    
    async canActivate(context: ExecutionContext): Promise<any> {
        const payload = this.extractPayload(context);
        if (!payload) {
            return new InvalidToken();
        }

        
            //await this.jwtService.verifyAsync(payload.jwtToken);
            
        const user = await this.jwtService.decode(payload.jwtToken);
        if (!user) {
            throw new InvalidToken();
        }
            
        if (user.role === 'admin') {
            // console.log("from admin-auth.guard gowa el if: " )
            return true;
        }else{
            // console.log("from admin-auth.guard gowa el else: " )
            throw new UNAUTHORIZED();
        } 

    }



    private extractPayload(context: ExecutionContext): { jwtToken: string } | null {
        const kafkaContext = context.switchToRpc();
        const payload = kafkaContext.getData();
        // console.log("from jwt-auth.guard extractPayload function: " )

        // Extract token from the message payload
        return payload ? { jwtToken: payload.jwtToken } : null;
  }
}

