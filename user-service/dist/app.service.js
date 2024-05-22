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
const mongoose_1 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const jsonwebtoken_1 = require("jsonwebtoken");
let AppService = class AppService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    getHello() {
        return 'Hello World!';
    }
    getUserByToken(jwtToken) {
        const user = (0, jsonwebtoken_1.decode)(jwtToken);
        const email = user['email'];
        return email;
    }
    async updateProfile(data, jwtToken) {
        const email = this.getUserByToken(jwtToken);
        const user = await this.userModel.findOne({ email: email });
        if (!user) {
            return { success: false, message: 'No such user exists!' };
        }
        if (data.firstName) {
            user.FirstName = data.firstName;
        }
        if (data.lastName) {
            user.LastName = data.lastName;
        }
        if (data.phone) {
            user.phone = data.phone;
        }
        if (data.address) {
            user.address = data.address;
        }
        await user.save();
        return { success: true, message: 'Profile updated successfully' };
    }
    async findByEmail(email) {
        console.log('email from service:', email);
        const user = await this.userModel.findOne({ email: email });
        if (!user) {
            return { success: false, message: 'No such email exists!' };
        }
        return { success: true, user };
    }
    async viewAddress(email) {
        console.log("email: appservice", email);
        const user = await this.userModel.findOne({ email: email });
        console.log("user address:", user.address);
        return { success: true, data: user.address };
    }
    async addAddress(email, label, address) {
        console.log("appservice email: ", email, "label:", label, "address:", address, "service");
        const user = await this.userModel.findOne({ email: email });
        user.address.push({ label: label, address: address });
        await user.save();
        return { success: true, data: user.address };
    }
    async deleteAddress(email, id) {
        console.log("appservice email: ", email, "id:", id, "service");
        try {
            const user = await this.userModel.findOne({ email: email });
            if (!user) {
                return { success: false, message: "User not found" };
            }
            user.address = user.address.filter((address) => address.label !== id);
            await user.save();
            return { success: true, data: user.address };
        }
        catch (error) {
            console.error("Error deleting address:", error);
            return { success: false, message: "Error deleting address" };
        }
    }
    async createUser(data) {
        console.log('Creating user:', data);
        const user = await this.userModel.findOne({
            email: data.email,
        });
        if (user) {
            return { success: false, message: 'User already exists' };
        }
        const newUser = new this.userModel({
            ...data,
        });
        await newUser.save();
        return { success: true, message: 'User created successfully', user: newUser };
    }
    async getUserEmailLinkToken(token) {
        console.log('Getting user email link token:', token);
        const user = await this.userModel.findOne({ VerificationCode: token });
        if (!user) {
            return { success: false, message: 'Invalid verification token' };
        }
        user.VerificationCode = null;
        user.Verification = true;
        await user.save();
        return { success: true, message: 'Email verified successfully' };
    }
    async updateUser(data) {
        console.log('Updating user:', data);
        const updateFields = Object.keys(data).reduce((acc, key) => {
            if (data[key] !== undefined) {
                acc[key] = data[key];
            }
            return acc;
        }, {});
        if (Object.keys(updateFields).length === 0) {
            return { success: false, message: 'No fields to update' };
        }
        const user = await this.userModel.findOneAndUpdate({ email: data.email }, { $set: updateFields }, { new: true, upsert: false });
        if (!user) {
            return { success: false, message: 'No such user exists!' };
        }
        return { success: true, message: 'User updated successfully', code: user.VerificationCode };
    }
    async getAllAdmins() {
        const Admins = await this.userModel.find({ role: 'admin' });
        if (Admins.length === 0) {
            return { message: "No admins Found" };
        }
        return { Admins };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_MODEL')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        jwt_1.JwtService])
], AppService);
//# sourceMappingURL=app.service.js.map