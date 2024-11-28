import mongoose from "mongoose";
import { USER_TYPE } from "../shared/constants.js";

const User = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    enum: Object.values(USER_TYPE),
  },
});

User.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("Users", User);
