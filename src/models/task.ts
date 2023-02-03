import { createSchema, Type, typedModel } from "ts-mongoose";
import * as Models from "./index";
const status = ["Completed", "Incomplete"];

const taskSchema = createSchema(
  {
    user_id: Type.ref(Type.objectId({ default: null })).to(
      "users",
      <any>Models.User
    ),
    date: Type.date({ default: null }),
    task: Type.string({ default: null }),
    status: Type.string({ enum: status, default: "Incomplete" }),
    priority: Type.number({ default: 0 }),
  },
  {
    timestamps: true,
  }
);

const Task = typedModel("task", taskSchema);
export default Task;
