/* eslint-disable prettier/prettier */
export class CreateUserDto{
    readonly FirstName: string;
    readonly LastName: string;
    readonly email: string;
    readonly password: string;
    readonly phone: string;
    readonly company: string;
    readonly address: Array<{
        label: string;
        address: string;
      }>;
    readonly cards: Array<{
        name: string;
        cardnumber: string;
        expiration: string;
        cvv: string;
      }>;
    readonly role: string;
}