"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const http_1 = require("http");
const cluster_1 = __importDefault(require("cluster"));
const totalCPUs = require("os").cpus().length;
const port = process.env.PORT || 3000;
if (cluster_1.default.isPrimary) {
    console.log(`Number of CPUs is ${totalCPUs}`);
    console.log(`Master ${process.pid} is running`);
    // Fork workers.
    for (let i = 0; i < totalCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log("Let's fork another worker!");
        cluster_1.default.fork();
    });
}
else {
    const server = (0, http_1.createServer)(app_1.default);
    console.log(`Worker ${process.pid} started`);
    server.listen(port, () => {
        console.log("server runnning on port -", port);
        console.log("swagger url : ", process.env.SCHEME +
            "://" +
            process.env.DOMAIN +
            ":" +
            process.env.PORT +
            "/api-docs/#/");
    });
    server.on("warning", (warning) => {
        console.log(warning.stack);
    });
}
