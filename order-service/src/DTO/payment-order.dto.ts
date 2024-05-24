/* eslint-disable prettier/prettier */
export class PayMobCreateOrderDTO {  
    readonly delivery_needed: string;
    readonly amount_cents: string;
    readonly currency: string;
    readonly merchant_order_id: string;
    readonly items: Array<{
        name: string;
        amount_cents: string;
        description: string;
        quantity: string;
    }>;
    readonly shipping_data: {
        apartment: string;
        email: string;
        floor: string;
        first_name: string;
        street: string;
        building: string;
        phone_number: string;
        postal_code: string;
        extra_description: string;
        city: string;
        country: string;
        last_name: string;
        state: string;
    };
    readonly shipping_details: {
        notes: string;
        number_of_packages: number;
        weight: number;
        weight_unit: string;
        length: number;
        width: number;
        height: number;
        contents: string;
    };
}
