import { Beneficiary } from "../models/index.js";
import bcrypt from "bcryptjs";

// Register Beneficiary
export const registerBeneficiary = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      profession,
      homeAddress,
      region,
      nationality,
      age,
    } = req.body;
    // confirmPassword
    const hashedPassword = await bcrypt.hash(password, 10);
    const beneficiary = new Beneficiary({
      email,
      password: hashedPassword,
      phone,
      profession,
      homeAddress,
      region,
      nationality,
      age,
      firstName,
      lastName,
    });
    await beneficiary.save();
    res.status(201).send("Beneficiary registered successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};
