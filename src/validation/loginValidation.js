import { body } from "express-validator";
import { validateRequest } from "../middlewares/validationResultMiddleware.js";
import { roleEnum } from "../types/enum/allExtentions.js";

export const loginValidation = [
  body("email").isEmail().withMessage("A valid email is required"),
  body("phone").isMobilePhone().withMessage("Enter a valid phone number"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("role")
    .isIn(Object.values(roleEnum))
    .withMessage(
      `Role must be one of: ${Object.values(roleEnum).join(" or ")}`
    ),
  validateRequest,
];
