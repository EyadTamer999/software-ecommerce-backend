/* eslint-disable prettier/prettier */
export class PayMobPaymentKeyDTO {
    readonly amount_cents: string;
    readonly expiration: number;
    readonly billing_data: {
        apartment: string;
        email: string;
        floor: string;
        first_name: string;
        street: string;
        building: string;
        phone_number: string;
        shipping_method: string;
        postal_code: string;
        city: string;
        country: string;
        last_name: string;
        state: string;
    };
    readonly currency: string;
    readonly integration_id: number;
    readonly lock_order_when_paid: string;
}
