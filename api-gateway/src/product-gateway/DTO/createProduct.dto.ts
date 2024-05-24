/* eslint-disable prettier/prettier */
import { IsString, IsNumber, IsBoolean, IsArray, IsOptional, IsDateString, Min, Max } from 'class-validator';

export class ReviewDto {
    @IsString()
    userId: string;

    @IsString()
    review: string;

    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;

    @IsDateString()
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

    @IsOptional()
    @IsString()
    size: string;

    @IsOptional()
    @IsString()
    color: string;

    @IsOptional()
    @IsString()
    material: string;

    @IsOptional()
    @IsNumber()
    rent_duration: number;

    @IsArray()
    reviews: ReviewDto[];

    @IsArray()
    @IsString({ each: true })
    relatedProducts: string[];

    @IsDateString()
    createdAt: Date;
}