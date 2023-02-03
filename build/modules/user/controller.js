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
const middlewares_1 = require("../../middlewares");
const services_1 = __importDefault(require("./services"));
class UserController {
    static signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { email, password } = req.body;
                let user_exist = yield services_1.default.isUserExists(email);
                if (user_exist) {
                    throw new Error("Email already registered. Please login in.");
                }
                const result = yield services_1.default.createUser(email, password);
                (0, middlewares_1.handleSuccess)(res, result);
            }
            catch (error) {
                (0, middlewares_1.handleCatchError)(res, error);
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { email, password } = req.body;
                const result = yield services_1.default.login(email, password);
                (0, middlewares_1.handleSuccess)(res, result);
            }
            catch (error) {
                (0, middlewares_1.handleCatchError)(res, error);
            }
        });
    }
    static verifyOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { email, otp } = req.body;
                const result = yield services_1.default.verifyOtp(email, otp);
                (0, middlewares_1.handleSuccess)(res, result);
            }
            catch (error) {
                (0, middlewares_1.handleCatchError)(res, error);
            }
        });
    }
}
exports.default = UserController;
