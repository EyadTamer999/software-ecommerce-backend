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
        this.kafkaClient.subscribeToResponseOf('view-profile');


    } 
    async updateProfile(user: any , jwtToken : any): Promise<any> {
        console.log('jwtToken from api-gateway: ' , jwtToken)
        console.log('user from api-gateway: ' , user)
        return this.kafkaClient.send('update_profile', { jwtToken ,user});
    }

    async viewProfile( jwtToken : any): Promise<any> {
        console.log("jwtToken from user gateway service: ", jwtToken);
        return this.kafkaClient.send('view-profile', {jwtToken});
    }


    async viewAddress(jwtToken : any): Promise<any> {
        //console.log("email:", email);
        return this.kafkaClient.send('view-address', {jwtToken});
    }
 
    async addAddress(data: {label: string, address: string},jwtToken:any): Promise<any> {
        console.log(
      "label:", data.label,
      "address:", data.address,"service"
    );
        return this.kafkaClient.send('add-address', {data,jwtToken});
    }


    async deleteAddress( id: string , jwtToken:any): Promise<any> {
        console.log(
      "id:", id,
      "service"
    );
        return this.kafkaClient.send('delete-address', {id,jwtToken});
    }

}
