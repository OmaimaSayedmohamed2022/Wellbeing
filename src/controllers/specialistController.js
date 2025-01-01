import bcrypt from "bcryptjs";
import { Specialist } from "../models/index.js";
import AppError from "../utils/appError.js";
// Add Specialist by Admin
export const addSpecialist = async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).send("Access Denied");

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
    const hashedPassword = await bcrypt.hash(password, 10);

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
    await specialist.save();
    res.status(201).send("Specialist added successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// List Specialists API
export const listSpecialists = async (req, res) => {
  try {
    const specialists = await Specialist.find(
      {},
      {
        "profile.title": 1,
        "profile.bio": 1,
        "profile.work": 1,
        "profile.sessionPrice": 1,
        "profile.yearsExperience": 1,
        "profile.sessionDuration": 1,
      }
    );
    res.status(200).send(specialists);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
