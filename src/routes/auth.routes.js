import express from "express";
import {
  registerBeneficiary,
  registerSpecialist,
  login,
} from "../controllers/index.js";
import {
  beneficiaryValidation,
  specialistValidation,
  loginValidation,
} from "../validation/index.js";

import { uploadFiles } from "../services/fileUploads/multer.js";
import { makeFiles } from "../middlewares/makeFiles.js";

const router = express.Router();

// Beneficiary Registration
router.post(
  "/register/beneficiary",
  beneficiaryValidation,
  registerBeneficiary
);


router.post(
  "/register/specialist",

  uploadFiles([
    { name: "idOrPassport", maxCount: 1 },
    { name: "resume", maxCount: 1 },
    { name: "certificates", maxCount: 10 },
    { name: "ministryLicense", maxCount: 1 },
    { name: "associationMembership", maxCount: 1 },
  ]),
  makeFiles,
  specialistValidation,
  registerSpecialist
);

// Login
router.post("/login", loginValidation, login);

export { router as authRoute };
