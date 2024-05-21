export declare class CreateUserDTO {
    readonly FirstName: string;
    readonly LastName: string;
    readonly email: string;
    password: string;
    readonly phone: string;
    readonly company: string;
    readonly address: Array<{
        label: string;
        address: string;
    }>;
    readonly role: string;
    Verification: boolean;
    VerificationCode: string;
    toString(): string;
}
