import { changeApplicationStatus, deleteApplication, getApplicationDetails, getApplications } from "../../controllers/employer/applications.controller";
import express from "express";

export const router = express.Router();

// get applications 
router.get("/", getApplications);

// get application 
router.get("/:id", getApplicationDetails)

// edit application 
router.put("/:id", changeApplicationStatus)

// delete application 
router.delete("/:id", deleteApplication);

