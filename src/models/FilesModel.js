import mongoose from "mongoose";

// Files Schema
const filesSchema = new mongoose.Schema({
  idOrPassport: {
    id: { type: String, required: true },
    url: { type: String, required: true },
  },
  resume: {
    id: { type: String, required: true },
    url: { type: String, required: true },
  },
  certificates: [
    {
      id: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  ministryLicense: {
    id: { type: String, required: true },
    url: { type: String, required: true },
  },
  associationMembership: {
    id: { type: String, required: true },
    url: { type: String, required: true },
  },
}, { timestamps: true });

const Files = mongoose.model("Files", filesSchema);

export default Files;
