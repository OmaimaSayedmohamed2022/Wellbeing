import mongoose from "mongoose";

// profile (Embedded Schema)
const profileSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "Dr. or Mr."
  bio: { type: String, required: true },
  work: { type: String },
  sessionPrice: { type: Number },
  yearsExperience: { type: Number },
  sessionDuration: { type: Number }, // in minutes
  availability: {
    type: String, // e.g., "Mon-Fri, 9am-5pm"
    // required: true,
  },
});
// Specialist Schema
const specialistSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    age: { type: Number, required: true },
    nationality: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    nationality: { type: String },
    company: { type: String, trim: true, required: true },
    region: { type: String, trim: true, required: true },
    workAddress: { type: String },
    homeAddress: { type: String },
    files: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Files",
      required: true,
    },
    profile: {
      type: profileSchema,
      required: true,
    },
  },
  { timestamps: true }
);

// Pre-save hook
specialistSchema.pre("save", function (next) {
  if (this.firstName && this.lastName) {
    console.log(" what!!!!!!!!!! ");

    this.fullName = `${this.firstName.trim()} ${this.lastName.trim()}`;
    console.log(" what!!!!!!!!!! ", this.fullName);
  }
  next();
});

// Pre-update hook
specialistSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update.firstName || update.lastName) {
    const firstName = update.firstName || this._update.firstName;
    const lastName = update.lastName || this._update.lastName;

    update.fullName = `${firstName.trim()} ${lastName.trim()}`;
  }

  next();
});

const Specialist = mongoose.model("Specialist", specialistSchema);

export { Specialist };
