export declare class CreateUserDTO {
    FirstName: string;
    LastName: string;
    readonly email: string;
    readonly password: string;
    readonly phone: string;
    readonly company: string;
    readonly address: Array<{
        label: string;
        address: string;
    }>;
    readonly role: string;
    readonly Verification: boolean;
    readonly VerificationCode: string;
    ordersQueue: Array<string>;
    toString(): string;
}
