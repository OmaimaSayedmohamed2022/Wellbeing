import express from "express";

import { authRoute } from "./auth.routes.js";
import { specialistRoute } from "./specialist.routes.js";
import { resetPasswordRoute } from "./resetPassword.routes.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/specialist", specialistRoute);
router.use("/resetPassword", resetPasswordRoute);

export default router;
