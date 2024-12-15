import { getResume, uploadMiddleware, uploadResume } from "../../controllers/applicant/applicantData.controller";
import express from "express"

export const router = express.Router();

// upload resume
router.post("/upload-resume", uploadMiddleware, uploadResume)

// get resume
router.get("/get-resume", getResume)
