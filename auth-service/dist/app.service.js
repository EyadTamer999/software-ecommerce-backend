"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const mailer_1 = require("@nestjs-modules/mailer");
const crypto_1 = require("crypto");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const Invalidtoken_1 = require("./exceptions/Invalidtoken");
let AppService = class AppService {
    constructor(userClient, mailerService, jwtService) {
        this.userClient = userClient;
        this.mailerService = mailerService;
        this.jwtService = jwtService;
        this.userClient.subscribeToResponseOf('create_user');
        this.userClient.subscribeToResponseOf('user_findByEmail');
        this.userClient.subscribeToResponseOf('GetUser-Email-link-token');
        this.userClient.subscribeToResponseOf('update-user');
    }
    async sendMail(email, link) {
        return this.mailerService.sendMail({
            to: email,
            from: process.env.EMAIL_USER,
            subject: 'User Registration Verification',
            text: 'Welcome to our platform! Please click the link below to verify your email address.',
            html: `<p>Welcome to our platform!</p><p>Please click the link below to verify your email address:</p><a href="${link}">Verify Email</a>`,
        }).then(() => {
            console.log('Email sent');
        })
            .catch((e) => {
            console.log('Error sending email', e);
        });
    }
    async verifyRegister(user) {
        try {
            const verificationToken = (0, crypto_1.randomBytes)(32).toString('hex');
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
            user.Verification = false;
            user.VerificationCode = verificationToken;
            const newUser = await this.userClient.send('create_user', user).toPromise();
            if (newUser.message === 'User already exists') {
                return { success: false, message: 'User already exists' };
            }
            const link = `http://${process.env.BASE_URL}/auth-gateway/verify-email?token=${newUser.user.VerificationCode}`;
            const info = await this.sendMail(newUser.user.email, link);
            const returnUser = {
                id: newUser.user._id,
                email: newUser.user.email,
                firstname: newUser.user.FirstName,
                lastname: newUser.user.LastName,
                phone: newUser.user.phone,
                company: newUser.user.company,
                address: newUser.user.address,
                Verification: newUser.user.Verification,
            };
            return { success: true, message: 'Email has been sent', returnUser };
        }
        catch (error) {
            throw error;
        }
        console.log('Verification email sent successfully');
    }
    async verifyEmail(token) {
        console.log('Verifying email:', token);
        const user = await this.userClient.send('GetUser-Email-link-token', token).toPromise();
        console.log("user when link send:", user);
        if (user.message === 'Invalid verification token') {
            return { success: false, message: 'Invalid verification token' };
        }
        return { success: true, message: 'Email verified successfully' };
    }
    async resendEmail(email) {
        console.log('Resending email:', email);
        const data = await this.userClient.send('user_findByEmail', email).toPromise();
        const user = data.user;
        if (data.message === "No such email exists!") {
            return { success: false, message: 'Email not Found' };
        }
        if (user.Verification) {
            return { success: false, message: 'User already verified' };
        }
        if (!user.VerificationCode) {
            user.VerificationCode = (0, crypto_1.randomBytes)(32).toString('hex');
            const updateuser = await this.userClient.send('update-user', user).toPromise();
        }
        const link = `http://${process.env.BASE_URL}/auth-gateway/verify-email?token=${user.VerificationCode}`;
        await this.sendMail(user.email, link);
        return { success: true, message: 'Email has been resent' };
    }
    async loginUser(loginDTO) {
        const data = await this.userClient.send('user_findByEmail', loginDTO.email).toPromise();
        const user = data.user;
        if (user && (await bcrypt.compare(loginDTO.password, user.password))) {
            const payload = { email: user.email, user: user._id, role: user.role };
            return { access_token: await this.jwtService.signAsync(payload) };
        }
        else {
            throw new Invalidtoken_1.InvalidToken();
        }
    }
    async validateToken(accessToken) {
        const token = await this.jwtService.verifyAsync(accessToken);
        if (!token) {
            return new common_1.UnauthorizedException();
        }
        return { token: token };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientKafka, mailer_1.MailerService,
        jwt_1.JwtService])
], AppService);
//# sourceMappingURL=app.service.js.map