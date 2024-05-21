"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProviders = void 0;
const user_schemas_1 = require("../schemas/user.schemas");
exports.userProviders = [
    {
        provide: 'USER_MODEL',
        useFactory: (connection) => connection.model('User', user_schemas_1.Userschema),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=user.providers.js.map