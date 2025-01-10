import { getEmployerActiveJobs, getEmployerArchivedJobs, getJob } from "../../controllers/jobs.controller";
import { createJob, deleteJob, editJob } from "../../controllers/employer/jobs.controller";
import express from "express";

export const router = express.Router();

// create job
router.post("/", createJob);

// edit job
router.put("/:id", editJob)

// delete job
router.delete("/:id", deleteJob);

// get active jobs
router.get("/active", getEmployerActiveJobs)

// get archived jobs
router.get("/archived", getEmployerArchivedJobs)

// get job
router.get("/get/:id", getJob)
