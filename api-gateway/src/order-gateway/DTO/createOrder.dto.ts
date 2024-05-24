/* eslint-disable prettier/prettier */
export class CreateOrderDTO{
    // readonly userId: string;
    readonly orderStatus: string; // open, closed, cancelled, pending
    readonly orderItems: Array<{
        productId: string,
        name : string,
        quantity:number,
        rent :boolean,
        rent_duration : number,
        color : string,    
        size : string,   // [ 'small', 'medium', 'large']
        material  : string,
        price : string,
    }>;
    readonly shippingAddress: {
        label: string,
        appartment:string,
        floor: string,
        street: string,
        building: string,
        postalcode: string,
        city: string,
        country: string,
        state: string,
        extra_description: string
    };
    readonly paymentMethod: string; // cash, card
    readonly deliveryStatus: string; // pending, delivered, cancelled
    readonly totalPrice: number;
    readonly DeliveryDate: Date;
    readonly paymentStatus: string; // unpaid, paid
    readonly couponCode: string;
}