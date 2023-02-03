"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("./controller"));
const validator_1 = require("./validator");
const router = (0, express_1.Router)();
router.post("/signup", validator_1.login, controller_1.default.signup);
router.post("/login", validator_1.login, controller_1.default.login);
router.put("/verify-otp", validator_1.verifyOtp, controller_1.default.verifyOtp);
exports.default = router;
