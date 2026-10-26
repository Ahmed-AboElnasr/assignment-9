import mongoose from "mongoose";
import { genderEnum, roleEnum } from "../../common/index.js";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minLength: [3, "First name must be at least 3 characters long"],
      maxLength: [50, "First name must be at most 50 characters long"],
      trim: true,
      validate: {
        validator: function (value) {
          // return value !== value.toUpperCase();
          return !/^[A-Z]+$/.test(value);
        },
        message: "First name can't be fully in uppercase",
      },
    },

    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minLength: [3, "Last name must be at least 3 characters long"],
      maxLength: [50, "Last name must be at most 50 characters long"],
      trim: true,
      validate: {
        validator: function (value) {
          // return value !== value.toUpperCase();
          return !/^[A-Z]+$/.test(value);
        },
        message: "Last name can't be fully in uppercase",
      },
    },
    
    email: {
      type: String,
      required: [true, "Email is required"],
      index: { name: "idx_email_unique", unique: true },
      lowercase: true,
      trim: true,
    },
    
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 6 characters long"],
    },

    role: {
      type: String,
      enum: Object.values(roleEnum),
      default: roleEnum.User,
    },
    
    gender: {
      type: String,
      enum: Object.values(genderEnum),
      default: genderEnum.Male,
    },
    
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [18, "Age must be at least 18"],
      max: [60, "Age must be at most 60"],
    },
    
    phoneNumber: String,
    
    profilePicture: String,
  },
  {
    virtuals: {
      fullName: {
        get() {
          return `${this.firstName}_${this.lastName}`;
        },
      },
    },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    collection: "users",
  },
);

const userModel = mongoose.model("userModel", userSchema);

export default userModel;
