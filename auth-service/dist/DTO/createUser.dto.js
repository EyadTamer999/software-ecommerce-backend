"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDTO = void 0;
class CreateUserDTO {
    toString() {
        return JSON.stringify({
            FirstName: this.FirstName,
            LastName: this.LastName,
            email: this.email,
            password: this.password,
            phone: this.phone,
            company: this.company,
            address: this.address,
            role: this.role,
            Verification: this.Verification,
            VerificationCode: this.VerificationCode
        });
    }
}
exports.CreateUserDTO = CreateUserDTO;
//# sourceMappingURL=createUser.dto.js.map