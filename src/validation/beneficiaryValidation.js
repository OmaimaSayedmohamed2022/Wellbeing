import { body } from "express-validator";
import { validateRequest } from "../middlewares/validationResultMiddleware.js";
import { Beneficiary } from "../models/BeneficiaryModel.js";

export const beneficiaryValidation = [
  body("region").notEmpty().withMessage("region is required"),
  body("firstName").notEmpty().withMessage("firstName is required"),
  body("lastName").notEmpty().withMessage("lastName is required"),
  body("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("invalid email address")
    .custom(async (val) => {
      await Beneficiary.findOne({ email: val }).then((beneficiary) => {
        if (beneficiary) {
          throw new Error("email already exist !");
        }
        return true;
      });
    }),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("phone").isMobilePhone().withMessage("Enter a valid phone number"),
  body("profession").notEmpty().withMessage("Profession is required"),
  body("age")
    .isInt({ min: 18 })
    .withMessage("Age must be a number greater than 18"),
  body("nationality").notEmpty().withMessage("Nationality is required"),
  body("homeAddress").notEmpty().withMessage("Home address is required"),
  validateRequest,
];
