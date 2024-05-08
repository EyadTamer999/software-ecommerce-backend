/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
export class CreateUserDTO{
readonly FirstName: string;
  readonly LastName: string;
  readonly email: string;
  password: string;
  readonly phone: string;
  readonly company: string;
  readonly address: Array<{
    label: string;
    address: string;
  }>
  readonly role: string;
  Verification: boolean;
  VerificationCode: string;
    

    toString(){
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