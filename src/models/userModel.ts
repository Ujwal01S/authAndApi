import mongoose from "mongoose";

// Define role enum as a string literal type
export type UserRole = "admin" | "user";

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "user"], // Specify allowed values
    default: "user",
    required: true,
  }
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);