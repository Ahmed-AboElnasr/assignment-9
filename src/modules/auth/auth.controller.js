import { Router } from "express";
import * as authService from "./auth.service.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as validators from "./auth.validation.js";

const router = Router();

router.post("/signUp", validation(validators.signup), async (req, res) => {
  const result = await authService.signUp(req.validat.body);
  return res
    .status(201)
    .json({ message: "User registered successfully", user: result });
});

router.post("/logIn", validation(validators.login), async (req, res) => {
  const result = await authService.logIn(req.validat.body);
  return res.json({ result })
});

export default router;
