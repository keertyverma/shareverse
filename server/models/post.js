import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, "userId is required"],
    },
    firstName: {
      type: String,
      required: [true, "firstName is required"],
    },
    lastName: {
      type: String,
      required: [true, "lastName is required"],
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);

export default Post;
