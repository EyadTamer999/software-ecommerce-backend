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
import { Connection } from 'mongoose';
export declare const userProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("mongoose").Model<{
        FirstName: string;
        LastName: string;
        email: string;
        password: string;
        phone: string;
        company: string;
        address: import("mongoose").Types.DocumentArray<{
            address: string;
            label: string;
        }>;
        role: string;
        Verification: boolean;
        ordersQueue: import("mongoose").Types.ObjectId[];
        VerificationCode?: string;
    }, {}, {}, {}, import("mongoose").Document<unknown, {}, {
        FirstName: string;
        LastName: string;
        email: string;
        password: string;
        phone: string;
        company: string;
        address: import("mongoose").Types.DocumentArray<{
            address: string;
            label: string;
        }>;
        role: string;
        Verification: boolean;
        ordersQueue: import("mongoose").Types.ObjectId[];
        VerificationCode?: string;
    }> & {
        FirstName: string;
        LastName: string;
        email: string;
        password: string;
        phone: string;
        company: string;
        address: import("mongoose").Types.DocumentArray<{
            address: string;
            label: string;
        }>;
        role: string;
        Verification: boolean;
        ordersQueue: import("mongoose").Types.ObjectId[];
        VerificationCode?: string;
    } & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
        FirstName: string;
        LastName: string;
        email: string;
        password: string;
        phone: string;
        company: string;
        address: import("mongoose").Types.DocumentArray<{
            address: string;
            label: string;
        }>;
        role: string;
        Verification: boolean;
        ordersQueue: import("mongoose").Types.ObjectId[];
        VerificationCode?: string;
    }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
        FirstName: string;
        LastName: string;
        email: string;
        password: string;
        phone: string;
        company: string;
        address: import("mongoose").Types.DocumentArray<{
            address: string;
            label: string;
        }>;
        role: string;
        Verification: boolean;
        ordersQueue: import("mongoose").Types.ObjectId[];
        VerificationCode?: string;
    }>> & import("mongoose").FlatRecord<{
        FirstName: string;
        LastName: string;
        email: string;
        password: string;
        phone: string;
        company: string;
        address: import("mongoose").Types.DocumentArray<{
            address: string;
            label: string;
        }>;
        role: string;
        Verification: boolean;
        ordersQueue: import("mongoose").Types.ObjectId[];
        VerificationCode?: string;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    }>>;
    inject: string[];
}[];
