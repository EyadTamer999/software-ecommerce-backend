import { IsString, IsNumber, IsBoolean, IsOptional, IsArray, Min, Max } from 'class-validator';

class CustomizationOptions {
  @IsArray()
  @IsString({ each: true })
  sizes: string[];

  @IsArray()
  @IsString({ each: true })
  colors: string[];

  @IsArray()
  @IsString({ each: true })
  materials: string[];
}

class RentalOption {
  @IsNumber()
  duration: number;

  @IsNumber()
  price: number;
}

class Review {
  @IsString()
  userId: string;

  @IsString()
  review: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}

export class CreateProductDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsNumber()
  price: number;

  @IsBoolean()
  availability: boolean;

  @IsNumber()
  stock: number;

  @IsArray()
  @IsString({ each: true })
  specifications: string[];

  @IsOptional()
  customizationOptions: CustomizationOptions;

  @IsArray()
  @IsOptional()
  rentalOptions: RentalOption[];

  @IsArray()
  @IsOptional()
  reviews: Review[];

  @IsArray()
  @IsString({ each: true })
  relatedProducts: string[];
}