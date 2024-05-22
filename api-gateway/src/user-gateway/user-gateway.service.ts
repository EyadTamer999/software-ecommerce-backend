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
        this.kafkaClient.subscribeToResponseOf('add-card');
        this.kafkaClient.subscribeToResponseOf('delete-card');
        

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
 
    async addAddress(data: {label: string, appartment: string, floor:string, street:string, building:string, postalcode:string, city:string, country:string, state:string, extra_description:string },jwtToken:any): Promise<any> {
        console.log(
        "label:", data.label,
        "appartment:", data.appartment,
        "floor:", data.floor,
        "street:", data.street,
        "building:", data.building,
        "postalcode:", data.postalcode,
        "city:", data.city,
        "country:", data.country,
        "state:", data.state,
        "extra_description:", data.extra_description,
        "gateway service"
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

    async addCard(data: {name: string, cardnumber: string, expiration: string, cvv: string},jwtToken:any): Promise<any> {
    console.log(
      "name:", data.name,
      "cardnumber:", data.cardnumber,
      "expiration:",data.expiration,
      "cvv:",data.cvv,
      "service"
    );
        return this.kafkaClient.send('add-card', {data,jwtToken});
    }


    async deleteCard( id: string , jwtToken:any): Promise<any> {
        console.log("cvv ana fel api gateway service:" , id);
    // console.log(
    //   "cvv:", cvv,
    //   "service"
    // );
        return this.kafkaClient.send('delete-card', {id,jwtToken});
    }
    
}
