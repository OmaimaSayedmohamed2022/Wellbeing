import mongoose from "mongoose";

// Beneficiary Schema
const beneficiarySchema = new mongoose.Schema({
  fullName: { type: String  },
  firstName: { type: String, trim: true, required: true },
  lastName: { type: String, trim: true, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  profession: { type: String },
  region: { type: String, trim: true, required: true },
  age: { type: Number, required: true },
  nationality: { type: String },
  homeAddress: { type: String },
});
// Pre-save hook
beneficiarySchema.pre("save", function (next) {
  if (this.firstName && this.lastName) {
    this.fullName = `${this.firstName.trim()} ${this.lastName.trim()}`;
  }
  next();
});

// Pre-update hook
beneficiarySchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update.firstName || update.lastName) {
    const firstName = update.firstName || this._update.firstName;
    const lastName = update.lastName || this._update.lastName;

    update.fullName = `${firstName.trim()} ${lastName.trim()}`;
  }

  next();
});

const Beneficiary = mongoose.model("Beneficiary", beneficiarySchema);

export { Beneficiary };
