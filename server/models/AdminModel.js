import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    default: "Admin",
  },
  password: String,
});

AdminSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("Admins", AdminSchema);
