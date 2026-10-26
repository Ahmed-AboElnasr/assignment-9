import { Router } from "express";
import * as messageService from "./message.service.js";

const router = Router();

// Sample endpoint
router.get("/", (req, res) => {
  res.send("message page");
});

export default router;