import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "firstName is required"],
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: [true, "lastName is required"],
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      max: 50,
      unique: [true, "email is already registered"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
