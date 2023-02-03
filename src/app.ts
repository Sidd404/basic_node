import express, { Application } from "express";
import session from "express-session";

import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggermerge from "swagger-merge";
var path = require("path");
import connect_to_db from "./config/db.connection";
import taskRoutes from "./modules/task/routes";
import userRoutes from "./modules/user/routes";
import swagger_document from "./output.openapi.json";

const app: Application = express();
// Use the session middleware
app.use(
  session({
    secret: "its my secret",
    cookie: { maxAge: 60000 }, // value of maxAge is defined in milliseconds.
    resave: false,
    rolling: false,
    saveUninitialized: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(cors());
app.use("/api/task", taskRoutes);
app.use("/api/user", userRoutes);
var info = {
  version: 1.0,
  title: "Company_Teams_task",
  description: "Api`s for Task",
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger_document));
connect_to_db();
export = app;
