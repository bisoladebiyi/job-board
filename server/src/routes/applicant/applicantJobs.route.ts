import { applyToJob, getAppliedJobs, getSavedJobs, saveJobs } from "../../controllers/applicant/applicantJobs.controller";
import express from "express"

export const router = express.Router();

router.post("/apply", applyToJob)
router.get("/applied", getAppliedJobs)
router.post("/save", saveJobs)
router.get("/saved", getSavedJobs)