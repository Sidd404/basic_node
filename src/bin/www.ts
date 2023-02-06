import app from "../app";
import { createServer } from "http";
import fs from "fs";
import cluster from "cluster";
const totalCPUs = require("os").cpus().length;
const port = process.env.PORT || 3000;

if (cluster.isPrimary) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {
  const server = createServer(app);
  console.log(`Worker ${process.pid} started`);

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
}
