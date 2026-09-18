import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["patient", "doctor"],
    required: true,
  },
  specialization: {
    type: [String],
    default: [],
  },
  age: {
    type: String,
    default: "",
  },
  bloodGroup: {
    type: String,
    default: "",
  },

  gender: {
    type: String,
    default: "",
  },
  contact: {
    type: String,
    default: "",
  },
  hospital: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  profilePicture: {
    url: {
        type: String,
        default: ""
    },
    publicId: {
        type: String,
        default: ""
    }
}
});

const User = mongoose.model("User", userSchema);

export default User;
