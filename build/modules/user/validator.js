"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = exports.login = void 0;
const joi_1 = __importDefault(require("joi"));
const middlewares_1 = require("../../middlewares");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let schema = joi_1.default.object({
            email: joi_1.default.string().required().trim(),
            password: joi_1.default.string().required().trim(),
        });
        let { error } = schema.validate(req.body);
        if (error) {
            throw yield (0, middlewares_1.handleJoiError)(error);
        }
        else {
            next();
        }
    }
    catch (err) {
        (0, middlewares_1.handleCatchError)(res, err);
    }
});
exports.login = login;
const verifyOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let schema = joi_1.default.object({
            email: joi_1.default.string().required().trim(),
            otp: joi_1.default.string().required().trim(),
        });
        let { error } = schema.validate(req.body);
        if (error) {
            throw yield (0, middlewares_1.handleJoiError)(error);
        }
        else {
            next();
        }
    }
    catch (err) {
        (0, middlewares_1.handleCatchError)(res, err);
    }
});
exports.verifyOtp = verifyOtp;
