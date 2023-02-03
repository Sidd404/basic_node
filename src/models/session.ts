import { createSchema, Type, typedModel } from "ts-mongoose";
import * as Models from "./index";
const type = [null, "USER", "ADMIN", "PORTAL", "MANAGER"];
const device_type = [null, "iOS", "Android"];

const sessionSchema = createSchema(
  {
    user_id: Type.ref(Type.objectId({ default: null })).to(
      "users",
      <any>Models.User
    ),
    access_token: Type.string({ default: null }),
    token_gen_at: Type.string({ default: null }),
    created_at: Type.string({ default: +new Date() }),
  },
  {
    timestamps: true,
  }
);

const Sessions = typedModel("sessions", sessionSchema);
export default Sessions;
