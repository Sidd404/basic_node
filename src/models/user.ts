import { createSchema, Type, typedModel } from "ts-mongoose";
import * as Models from "./index";

const userSchema = createSchema(
  {
    email: Type.string({ default: null }),
    password: Type.string({ default: null }),
    otp: Type.string({ default: null }),
  },
  {
    timestamps: true,
  }
);

const User = typedModel("users", userSchema);
export default User;
