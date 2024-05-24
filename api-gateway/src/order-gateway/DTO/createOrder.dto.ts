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
        label: string;
        address: string;
    };
    readonly paymentMethod: string; // cash, card
    readonly deliveryStatus: string; // pending, delivered, cancelled
    readonly totalPrice: number;
    readonly DeliveryDate: Date;
    readonly paymentStatus: string; // unpaid, paid
    readonly couponCode: string;
}