/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import * as mongoose from 'mongoose';
export declare const ProductSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    price: number;
    name: string;
    description: string;
    images: string[];
    availability: boolean;
    stock: number;
    specifications: string[];
    rentalOptions: mongoose.Types.DocumentArray<{
        duration?: number;
        price?: number;
    }>;
    reviews: mongoose.Types.DocumentArray<{
        createdAt: Date;
        userId?: mongoose.Types.ObjectId;
        review?: string;
        rating?: number;
    }>;
    relatedProducts: mongoose.Types.ObjectId[];
    createdAt: Date;
    customizationOptions?: {
        sizes: string[];
        colors: string[];
        materials: string[];
    };
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    price: number;
    name: string;
    description: string;
    images: string[];
    availability: boolean;
    stock: number;
    specifications: string[];
    rentalOptions: mongoose.Types.DocumentArray<{
        duration?: number;
        price?: number;
    }>;
    reviews: mongoose.Types.DocumentArray<{
        createdAt: Date;
        userId?: mongoose.Types.ObjectId;
        review?: string;
        rating?: number;
    }>;
    relatedProducts: mongoose.Types.ObjectId[];
    createdAt: Date;
    customizationOptions?: {
        sizes: string[];
        colors: string[];
        materials: string[];
    };
}>> & mongoose.FlatRecord<{
    price: number;
    name: string;
    description: string;
    images: string[];
    availability: boolean;
    stock: number;
    specifications: string[];
    rentalOptions: mongoose.Types.DocumentArray<{
        duration?: number;
        price?: number;
    }>;
    reviews: mongoose.Types.DocumentArray<{
        createdAt: Date;
        userId?: mongoose.Types.ObjectId;
        review?: string;
        rating?: number;
    }>;
    relatedProducts: mongoose.Types.ObjectId[];
    createdAt: Date;
    customizationOptions?: {
        sizes: string[];
        colors: string[];
        materials: string[];
    };
}> & {
    _id: mongoose.Types.ObjectId;
}>;
