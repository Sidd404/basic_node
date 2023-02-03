"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
const userSchema = (0, ts_mongoose_1.createSchema)({
    email: ts_mongoose_1.Type.string({ default: null }),
    password: ts_mongoose_1.Type.string({ default: null }),
    otp: ts_mongoose_1.Type.string({ default: null }),
}, {
    timestamps: true,
});
const User = (0, ts_mongoose_1.typedModel)("users", userSchema);
exports.default = User;
