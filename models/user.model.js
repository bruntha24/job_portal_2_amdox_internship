import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "employer"], default: "user" },
    mobile: { type: String }, // optional mobile number
    workStatus: {
      type: String,
      enum: ["experienced", "fresher"],
      default: "fresher",
    },
    notifications: { type: Boolean, default: true }, // receive updates
    avatar: { type: String }, // avatar file path
    resume: { type: String }, // resume file path
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
