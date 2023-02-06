import mongoose from "mongoose";
require("dotenv").config();
var mongodb_url = process.env.MONGODB_URI;
console.log("mongo uri -", mongodb_url);
const connect_to_db = async () => {
  let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  };

  mongoose.connect(mongodb_url, options);
  mongoose.connection.on("connected", (data: any) => {
    console.log("connected to MongoDb");
  });
  mongoose.connection.on("error", (error: any) => {
    console.log(error);
  });
};

export default connect_to_db;
