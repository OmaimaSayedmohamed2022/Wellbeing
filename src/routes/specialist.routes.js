import express from "express";
import { addSpecialist, listSpecialists } from "../controllers/index.js";
import { authenticate } from "../middlewares/authenticate.js";
import { specialistValidation } from "../validation/index.js";

const router = express();

router.post("/", authenticate, specialistValidation, addSpecialist); // Add Specialist (Admin only)
router.get("/", listSpecialists);

export { router as specialistRoute };
