import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: true
  },
});

export const Auth = mongoose.model("AuthUser", authSchema);