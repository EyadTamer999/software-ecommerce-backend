/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
export class CreateUserDTO{
  FirstName: string;
  LastName: string;
  readonly email: string;


  readonly password: string;
  readonly phone: string;
  readonly company: string;
  readonly address: Array<{
    label: string;
      appartment: string;
      floor: string;
      street: string;
      building: string;
      postalcode: string;
      city: string;
      country: string;
      state: string;
      extra_description: string;
  }>
 
  readonly role: string;
  readonly Verification: boolean;
  readonly VerificationCode: string;
  ordersQueue: Array<string>;

  
    

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