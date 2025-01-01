import { body } from "express-validator";
import { validateRequest } from "../middlewares/validationResultMiddleware.js";

export const specialistValidation = [
  body("region").notEmpty().withMessage("region is required"),
  body("company").notEmpty().withMessage("company is required"),
  body("firstName").notEmpty().withMessage("firstName is required"),
  body("lastName").notEmpty().withMessage("lastName is required"),
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("age").isInt({ min: 18 }).withMessage("Age must be a number greater 18"),
  body("phone").isMobilePhone().withMessage("Enter a valid phone number"),
  body("nationality").notEmpty().withMessage("Nationality is required"),
  body("work").notEmpty().withMessage("Work is required"),
  body("workAddress").notEmpty().withMessage("Work address is required"),
  body("homeAddress").notEmpty().withMessage("Home address is required"),
  body("title").notEmpty().withMessage("Title is required"),
  body("bio").notEmpty().withMessage("Bio is required"),
  body("sessionPrice")
    .isNumeric()
    .withMessage("Session price must be a number"),
  body("yearsExperience")
    .isNumeric()
    .withMessage("Years of experience must be a number"),
  body("sessionDuration")
    .isNumeric()
    .withMessage("Session duration must be a number"),
  validateRequest,
];
