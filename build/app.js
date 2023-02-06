"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var path = require("path");
const db_connection_1 = __importDefault(require("./config/db.connection"));
const routes_1 = __importDefault(require("./modules/task/routes"));
const routes_2 = __importDefault(require("./modules/user/routes"));
const output_openapi_json_1 = __importDefault(require("./output.openapi.json"));
const app = (0, express_1.default)();
// Use the session middleware
app.use((0, express_session_1.default)({
    secret: "its my secret",
    cookie: { maxAge: 60000 },
    resave: false,
    rolling: false,
    saveUninitialized: true,
}));
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
let swagger_url = process.env.SCHEME +
    "://" +
    process.env.DOMAIN +
    ":" +
    process.env.PORT +
    "/api-docs/#/";
app.get("/", (req, res) => {
    res.send(`Hello, Please use the url to access swagger documentation, ${swagger_url} `);
});
app.use("/api/task", routes_1.default);
app.use("/api/user", routes_2.default);
var info = {
    version: 1.0,
    title: "Node_task",
    description: "Api`s for Task",
};
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(output_openapi_json_1.default));
(0, db_connection_1.default)();
module.exports = app;
