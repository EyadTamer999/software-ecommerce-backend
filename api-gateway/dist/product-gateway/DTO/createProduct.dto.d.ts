declare class CustomizationOptions {
    sizes: string[];
    colors: string[];
    materials: string[];
}
declare class RentalOption {
    duration: number;
    price: number;
}
declare class Review {
    userId: string;
    review: string;
    rating: number;
}
export declare class createProductDto {
    name: string;
    description: string;
    images: string[];
    price: number;
    availability: boolean;
    stock: number;
    specifications: string[];
    customizationOptions: CustomizationOptions;
    rentalOptions: RentalOption[];
    reviews: Review[];
    relatedProducts: string[];
}
export {};
