/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';


 
@Injectable()
export class UserGatewayService {
    constructor(@Inject('USER_SERVICE') private readonly kafkaClient: ClientKafka) {


        this.kafkaClient.subscribeToResponseOf('update_profile');

        this.kafkaClient.subscribeToResponseOf('view-address');
        this.kafkaClient.subscribeToResponseOf('add-address');
        this.kafkaClient.subscribeToResponseOf('delete-address');


    } 
    async updateProfile(user: any , jwtToken : any): Promise<any> {
        console.log('jwtToken from api-gateway: ' , jwtToken)
        console.log('user from api-gateway: ' , user)
        return this.kafkaClient.send('update_profile', { jwtToken ,user});
    }


    async viewAddress(email: string): Promise<any> {
        console.log("email:", email);
        return this.kafkaClient.send('view-address', {email});
    }
 
    async addAddress(data: {email: string, label: string, address: string}): Promise<any> {
        console.log("email:", data.email,
      "label:", data.label,
      "address:", data.address,"service"
    );
        return this.kafkaClient.send('add-address', data);
    }


    async deleteAddress(data: {email: string, id: string}): Promise<any> {
        console.log("email:", data.email,
      "id:", data.id,
      "service"
    );
        return this.kafkaClient.send('delete-address', data);
    }

}
