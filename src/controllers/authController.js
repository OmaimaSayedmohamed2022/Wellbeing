import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Beneficiary, Specialist, Admin } from "../models/index.js";

// Login API
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    let user;
    if (role === "beneficiary") user = await Beneficiary.findOne({ email });
    else if (role === "specialist") user = await Specialist.findOne({ email });
    else if (role === "admin") user = await Admin.findOne({ email });

    if (!user) return res.status(404).send("User not found");
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("Invalid password");

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Register Specialist API
export const registerSpecialist = async (req, res) => {
  try {
    const {
      region,
      company,
      age,
      firstName,
      lastName,
      email,
      password,
      phone,
      nationality,
      workAddress,
      homeAddress,
      files,
      title,
      bio,
      work,
      sessionPrice,
      yearsExperience,
      sessionDuration,
      availability,
    } = req.body;

    // Validate required fields

    // Check if specialist already exists
    const existingSpecialist = await Specialist.findOne({ email });
    if (existingSpecialist) {
      return res
        .status(400)
        .send("Specialist already registered with this email.");
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create the specialist object
    const specialist = new Specialist({
      region,
      company,
      age,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      nationality,
      workAddress,
      homeAddress,
      files,
      profile: {
        title,
        bio,
        work,
        sessionPrice,
        yearsExperience,
        sessionDuration,
        availability,
      },
    });

    // Save the specialist to the database
    await specialist.save();
    res.status(201).send("Specialist registered successfully.");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error.");
  }
};


