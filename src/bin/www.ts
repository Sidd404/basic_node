import app from "../app";
import { createServer } from "http";
import fs from "fs";

const port = process.env.PORT || 3000;
const server = createServer(app);

server.listen(port, () => {
  console.log("server runnning on port -", port);
  console.log(
    "swagger url : ",
    process.env.SCHEME +
      "://" +
      process.env.DOMAIN +
      ":" +
      process.env.PORT +
      "/api-docs/#/"
  );
});

server.on("warning", (warning) => {
  console.log(warning.stack);
});
