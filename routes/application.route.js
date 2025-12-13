import express from "express";
import protect from "../middleware/isAuthenticated.js";
import upload from "../middleware/upload.js";
import {
  createApplication,
  getApplications,
  getApplicationById,
} from "../controllers/application.controller.js";

const router = express.Router();

// GET all applications
router.get("/", getApplications);

// GET single application
router.get("/:id", getApplicationById);

// CREATE application (resume upload) ➜ MATCH FRONTEND
router.post(
  "/create",
  protect,
  upload.single("resume"),
  createApplication
);

export default router;
