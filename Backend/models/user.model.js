import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      // ❌ unique: true यहाँ नहीं होना चाहिए (नीचे समझाया है)
    },
  },
  {
    minimize: false,
    timestamps: true, // createdAt और updatedAt अपने आप add होंगे
  }
);

// अगर model पहले से मौजूद है तो reuse करो (Hot Reload issue fix)
const userModel =
  mongoose.models.User || mongoose.model("User", userSchema, "users");

export default userModel;
