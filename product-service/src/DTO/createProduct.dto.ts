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

export class createProductDto {
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

  toString(){
    return JSON.stringify({
        name: this.name,
        description: this.description,
        images: this.images,
        price: this.price,
        availability: this.availability,
        stock: this.stock,
        specifications: this.specifications,
        customizationOptions: this.customizationOptions,
        rentalOptions: this.rentalOptions,
        reviews: this.reviews,
        relatedProducts: this.relatedProducts
});
}
}