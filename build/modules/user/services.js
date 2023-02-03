"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const Models = __importStar(require("../../models"));
const DAO_1 = __importDefault(require("../../DAO"));
const index_1 = require("../../middlewares/index");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class UserServices {
    static createUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let encrypted_password = yield index_1.Common.encryptPassword(password);
                let data = {
                    email: email.toLowerCase(),
                    password: encrypted_password,
                };
                let user = yield DAO_1.default.saveDocument(Models.User, data);
                return { message: "User signup successful." };
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this.isUserExists(email);
                if (!user) {
                    throw new Error("User not found.");
                }
                let verify_password = yield index_1.Common.comparePassword(password, user.password);
                if (!verify_password) {
                    throw new Error("Incorrect email or password.");
                }
                let otp = yield index_1.Common.generate_otp(4);
                let data = {
                    email,
                    otp,
                };
                let query = {
                    email: email.toLowerCase(),
                };
                let update = {
                    otp: otp.toString(),
                };
                yield DAO_1.default.findOneAndUpdate(Models.User, query, update, {});
                yield this.send_otp(data);
                return { message: "Otp sent on mail. Please verify" };
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    static verifyOtp(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = {
                email: email,
            };
            let user = yield DAO_1.default.getDetails(Models.User, query, {}, {});
            if (user.otp !== otp) {
                throw new Error("Invalid Otp");
            }
            user.otp = null;
            user.save();
            let payload = {
                _id: user._id,
                email: user.email,
            };
            let token = yield index_1.Common.generateToken(payload);
            let response = {
                message: "User login successful.",
                token: token,
            };
            return response;
        });
    }
    static isUserExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = {
                    email: email.toLowerCase(),
                };
                let user = yield DAO_1.default.getData(Models.User, query, {}, {});
                if (user.length) {
                    return user[0];
                }
                else {
                    return false;
                }
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    static send_otp(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { email, otp } = data;
                let subject = "Welcome : Please login via otp";
                let title = `Hi`;
                let message = `Your 4 digit’s verification code is ${otp}.`;
                let file_path = path_1.default.join(__dirname, "../../public/html/template_1.html");
                let html = fs_1.default.readFileSync(file_path, { encoding: "utf-8" });
                html = html.replace("%TITLE%", title);
                html = html.replace("%MESSAGE%", message);
                yield index_1.Common.send_email(email, subject, html);
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = UserServices;
