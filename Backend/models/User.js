
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Simple email validation regex
        },
        message: "Invalid email format",
      },
    },
    full_name: {
      type: String,
      required: true,
    },
    staff_status: {
      type: Boolean,
      default: false, // Default value
    },
    otp: {
      type: String,
      default: null, // Allow null values
    },
    otpexpires: {
      type: Date,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    collection: "users", // Ensures the collection name is 'users'
  }
);

const User = mongoose.model("User", userSchema);

export default User;
