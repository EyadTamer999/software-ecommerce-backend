/* eslint-disable prettier/prettier */
import { Inject, Injectable, UnauthorizedException, } from '@nestjs/common';
import { CreateUserDTO } from './DTO/createUser.dto';
import { ClientKafka } from '@nestjs/microservices';
import { MailerService } from '@nestjs-modules/mailer';
import { randomBytes } from 'crypto';
import { LoginUserDTO } from './DTO/loginUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_SERVICE') private userClient: ClientKafka,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {
    this.userClient.subscribeToResponseOf('user_register');
    this.userClient.subscribeToResponseOf('user_findByEmail');
  }
  getHello(): string {
    return 'Hello World!';
  }

  private async sendMail(email: string, link: string): Promise<any> {
    return this.mailerService
      .sendMail({
        to: email,
        from: process.env.EMAIL_USER,
        subject: 'User Registration Verification',
        text: 'Welcome to our platform! Please click the link below to verify your email address.',
        html: `<p>Welcome to our platform!</p><p>Please click the link below to verify your email address:</p><a href="${link}">Verify Email</a>`,
      })
      .then(() => {
        console.log('Email sent');
      })
      .catch((e) => {
        console.log('Error sending email', e);
      });
  }

  async verifyRegister(user: CreateUserDTO): Promise<any> {
    console.log('Registering user final:', user);

    const res = await this.userClient.send('user_register', user).toPromise();
    if (!res.success) {
      return { success: false, message: 'Failed to register', data: user };
    }

    const link = `http://${process.env.BASE_URL}/Users/verify-email?token=${res.code}`;
    console.log('Verification link:', link); // Add this line to log the value of link
    try {
      const info = await this.sendMail(res.data.email, link);
    } catch (error) {
      throw error;
    }

    console.log('Verification email sent successfully');

    return { success: true, message: 'Email has been sent', data: res.data };
  }

  async loginUser(loginDTO: LoginUserDTO): Promise<{ access_token: string }> {
    const user = await this.userClient.send('user_findByEmail', loginDTO).toPromise();
    if (user && (await bcrypt.compare(loginDTO.password, user.data.password))) {
      const payload = { email : user.data.email};
      console.log("payload:", payload)
      return { access_token : await this.jwtService.signAsync(payload)}
    } else {
      throw new UnauthorizedException();
    }
  }
  
  async validateToken(accessToken: string): Promise<any> {
    const token = await this.jwtService.verifyAsync(accessToken);
    if (!token){
      return new UnauthorizedException();
    }
    // check for the user details in the payload using the findByEmail
    return { token: token}
  }
}
