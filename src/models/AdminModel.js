import mongoose from "mongoose";

// Admin Schema
const adminSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const Admin = mongoose.model("Admin", adminSchema);

// Export Model
export { Admin };
