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
require("dotenv").config();
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_smtp_transport_1 = __importDefault(require("nodemailer-smtp-transport"));
var path = require("path");
const randomstring_1 = __importDefault(require("randomstring"));
const nodemailer_email = process.env.NODEMAILER_MAIL;
const nodemailer_password = process.env.NODEMAILER_PASSWORD;
const transporter = nodemailer_1.default.createTransport((0, nodemailer_smtp_transport_1.default)({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: nodemailer_email,
        pass: nodemailer_password,
    },
}));
class Common {
    static generate_otp(len) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let options = {
                    length: len,
                    charset: "123456789",
                };
                let otp = randomstring_1.default.generate(options);
                return otp;
            }
            catch (err) {
                throw err;
            }
        });
    }
    ;
    static send_email(to, subject, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let mailOptions = {
                    from: nodemailer_email,
                    to: to,
                    subject: subject,
                    html: body,
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log("Email sent: " + info.response);
                    }
                });
            }
            catch (err) {
                throw err;
            }
        });
    }
    static pagination(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            let new_limit = !limit
                ? parseInt(process.env.DEFAULT_LIMIT)
                : parseInt(limit);
            let skip = !page || page == "0" ? 0 : (parseInt(page) - 1) * new_limit;
            return { skip, new_limit };
        });
    }
    static generateToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    let secret_key = process.env.JWT_SECRET_KEY;
                    const token = jsonwebtoken_1.default.sign(data, secret_key, { expiresIn: "1h" });
                    return resolve(token);
                }
                catch (error) {
                    throw reject(error);
                }
            });
        });
    }
    static decodeToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let secret_key = process.env.JWT_SECRET_KEY;
            let decoded = yield jsonwebtoken_1.default.verify(token, secret_key);
            return decoded;
        });
    }
    static encryptPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = (0, bcrypt_1.genSaltSync)(10);
            const encryptPassword = (0, bcrypt_1.hashSync)(password, salt);
            return encryptPassword;
        });
    }
    static comparePassword(password, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (0, bcrypt_1.compareSync)(password, hash);
            return result;
        });
    }
}
exports.default = Common;
