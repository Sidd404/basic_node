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
class Queries {
    static saveDocument(Model, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    let doc = new Model(data);
                    let result = doc.save();
                    return resolve(result);
                }
                catch (error) {
                    return reject(error);
                }
            });
        });
    }
    static createDocument(Model, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    let result = Model.create(data);
                    return resolve(result);
                }
                catch (error) {
                    return reject(error);
                }
            });
        });
    }
    static getData(Model, query, projection, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    let result = Model.find(query, projection, options);
                    return resolve(result);
                }
                catch (error) {
                    return reject(error);
                }
            });
        });
    }
    static getDetails(Model, query, projection, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    let result = Model.findOne(query, projection, options);
                    return resolve(result);
                }
                catch (error) {
                    return reject(error);
                }
            });
        });
    }
    static aggregate(Model, pipeline) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    let data = Model.aggregate(pipeline);
                    return resolve(data);
                }
                catch (error) {
                    return reject(error);
                }
            });
        });
    }
    static findOneAndUpdate(Model, query, body, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    let data = Model.findOneAndUpdate(query, body, options);
                    return resolve(data);
                }
                catch (error) {
                    return reject(error);
                }
            });
        });
    }
    static deleteOne(Model, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    let data = Model.deleteOne(query);
                    return resolve(data);
                }
                catch (error) {
                    return reject(error);
                }
            });
        });
    }
}
exports.default = Queries;
