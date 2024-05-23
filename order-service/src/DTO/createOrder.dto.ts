/* eslint-disable prettier/prettier */
export class CreateOrderDTO{
    // readonly userId: string;
    readonly orderStatus: string; // open, closed, cancelled, pending
    readonly orderItems: Array<{
        productId: string;
        quantity: number;
        rent: boolean;
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


    toString(){
        return JSON.stringify({
            // userId: this.userId,
            orderStatus: this.orderStatus,
            orderItems: this.orderItems,
            shippingAddress: this.shippingAddress,
            paymentMethod: this.paymentMethod,
            deliveryStatus: this.deliveryStatus,
            totalPrice: this.totalPrice,
            DeliveryDate: this.DeliveryDate,
            paymentStatus: this.paymentStatus,
            couponCode: this.couponCode
    });
    }
}