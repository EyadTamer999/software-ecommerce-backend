/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
export class CreateUserDTO{
    readonly name: String;
    readonly email: String;
    

    toString(){
        return JSON.stringify({
            name:this.name,
            email:this.email,
            
    });

    }
}