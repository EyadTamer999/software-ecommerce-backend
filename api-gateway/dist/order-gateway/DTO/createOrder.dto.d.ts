export declare class CreateOrderDTO {
    readonly orderStatus: string;
    readonly orderItems: Array<{
        productId: string;
        quantity: number;
        rent: boolean;
    }>;
    readonly shippingAddress: {
        label: string;
        address: string;
    };
    readonly paymentMethod: string;
    readonly deliveryStatus: string;
    readonly totalPrice: number;
    readonly DeliveryDate: Date;
    readonly paymentStatus: string;
    readonly couponCode: string;
}
