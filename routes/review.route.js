import express from "express";
import { createReview, getCompanyReviews } from "../controllers/review.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/", isAuthenticated, createReview);
router.get("/:id", getCompanyReviews);

export default router;
