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
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["startup", "investor"],
      required: [true, "Role is required"],
    },
  },
  { timestamps: true }
);

// Index for filtering users by role
userSchema.index({ role: 1 });
// Note: email index is already created by unique: true

export default mongoose.models.User || mongoose.model("User", userSchema);
