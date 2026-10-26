import { Router } from "express";
import * as userService from "./user.service.js";
import { authenticateUser } from "../../middleware/authentication.middleware.js";

const router = Router();

router.get("/profile", authenticateUser, async (req, res) => {
  const result = await userService.getProfileById(req.authUser);
  res.json({ message: "User retrieved successfully", user: result });
});

router.get("/list", async (req, res) => {
  const { page, limit } = req.query;
  const result = await userService.getAllUsers(page, limit);
  res.json({ message: "Users retrieved successfully", user: result });
});

router.patch("/profile", authenticateUser, async (req, res) => {
  const { firstName, lastName, email, password, role, gender, age, phone } = req.body;
  const result = await userService.updateProfile(req.authUser._id, { firstName, lastName, email, password, role, gender, age, phone });
  res.json({ message: "User updated successfully", user: result });
});

router.delete("/profile", authenticateUser, async (req, res) => {
  const result = await userService.deleteProfile(req.authUser._id);
  res.json({ message: "User deleted successfully", result });
});

export default router;
