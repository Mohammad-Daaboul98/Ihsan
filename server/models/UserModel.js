import mongoose from "mongoose";
import { USER_TYPE } from "../../shared/constants.js";

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
  },
  password: String,
  age: Date,
  role: {
    type: String,
    enum: Object.values(USER_TYPE),
  },
});

UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};


export default mongoose.model("Users", UserSchema);
