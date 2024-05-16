/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';


@Injectable()
export class AuthGatewayService {
    constructor(@Inject('AUTH_SERVICE') private readonly kafkaClient: ClientKafka) {
        this.kafkaClient.subscribeToResponseOf('verify_user_register');
        this.kafkaClient.subscribeToResponseOf('verify_email');
        this.kafkaClient.subscribeToResponseOf('resend_email');
        this.kafkaClient.subscribeToResponseOf('login_user');
        this.kafkaClient.subscribeToResponseOf('update_password');
        
    }


    
    async verifyRegisterUser(user: any): Promise<any> {
        // console.log('ana fe auth-gateway.......');
        // console.log('user:', user);
        return this.kafkaClient.send('verify_user_register', user).toPromise();
    }

    async resendEmail(email: string): Promise<any> {
        console.log('resend email service :', email);
        return this.kafkaClient.send('resend_email',  email ).toPromise();
    }

    async verifyEmail(token: string): Promise<any> {
        return this.kafkaClient.send('verify_email', { token });
    }

    async loginUser(user: any): Promise<any> {
        return this.kafkaClient.send('login_user', user).toPromise();
    }


    async updatePassword(data: {oldpassword: string, newpassword: string}, jwtToken:any): Promise<any> {
        return this.kafkaClient.send('update_password', {data,jwtToken}).toPromise();
    }
}
