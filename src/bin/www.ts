import app from "../app";
import http from "http";
import https from "http";
import fs from "fs";
require("dotenv").config();
const port = process.env.PORT || 3000;
let server: any;

server.listen(port, () => {
  console.log("server runnning on port -", port);
});

if (process.env.NODE_ENV == "PROD") {
  let key = fs.readFileSync(process.env.SSL_KEY);
  let cert = fs.readFileSync(process.env.SSL_CERT);
  let options: any = { key: key, cert: cert };
  server = https.createServer(options, app);

  server.listen(port, () => {
    console.log(`Server running at port ${port}...`);
  });
} else {
  server = http.createServer(app);
  server.listen(port, () => {
    console.log(`Server running at port ${port}...`);
  });
}

console.log(
  "swagger url : ",
  process.env.SCHEME +
    "://" +
    process.env.DOMAIN +
    ":" +
    process.env.PORT +
    "/api-docs/#/"
);
server.on("warning", (warning) => {
  console.log(warning.stack);
});
