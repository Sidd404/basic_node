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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleJoiError = exports.handleSuccess = exports.handleCatchError = void 0;
const handleCatchError = (res, error) => {
    let { type, status_code, message } = error;
    console.log("catch error-", error);
    if (type == undefined) {
        type = "Bad Request";
    }
    if (status_code == undefined) {
        status_code = 400;
    }
    if (message == undefined) {
        message = error;
    }
    res.status(status_code).send({
        success: false,
        error: type,
        error_description: message,
    });
    res.end();
};
exports.handleCatchError = handleCatchError;
const handleSuccess = (res, response) => {
    let data = {
        success: true,
        data: response,
    };
    res.send(data);
};
exports.handleSuccess = handleSuccess;
const handleJoiError = (error) => __awaiter(void 0, void 0, void 0, function* () {
    let error_message = error.details[0].message;
    let custom_message = error_message.replace(/"/g, "");
    throw {
        status_code: 400,
        type: "Joi Error",
        error_message: custom_message,
    };
});
exports.handleJoiError = handleJoiError;
