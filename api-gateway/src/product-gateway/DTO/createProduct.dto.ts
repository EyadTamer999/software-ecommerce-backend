import { IsString, IsNumber, IsArray, IsOptional, IsMongoId, Min, Max, IsDate } from 'class-validator';

export class ReviewDto {
    @IsMongoId()
    userId: string;

    @IsString()
    review: string;

    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;

    @IsDate()
    createdAt: Date;
}

export class createProductDto {
    @IsString()
    name: string;

    @IsString()
    category: string;

    @IsNumber()
    discount: number;

    @IsString()
    description: string;

    @IsArray()
    @IsString({ each: true })
    images: string[];

    @IsNumber()
    buy_price: number;

    @IsNumber()
    rent_price: number;

    @IsNumber()
    availability: number;

    @IsNumber()
    stock: number;

    @IsArray()
    @IsString({ each: true })
    specifications: string[];

    @IsString()
    @IsOptional()
    size: string;

    @IsString()
    color: string;

    @IsString()
    material: string;

    @IsNumber()
    rent_duration: number;

    @IsArray()
    @IsMongoId({ each: true })
    wishers: string[];

    @IsArray()
    @IsMongoId({ each: true })
    FavoriteFor: string[];

    @IsArray()
    reviews: ReviewDto[];

    @IsArray()
    @IsMongoId({ each: true })
    relatedProducts: string[];

    @IsDate()
    createdAt: Date;
}