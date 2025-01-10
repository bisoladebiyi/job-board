import { Request, Response } from "express";
import Applicant from "../../models/applicant/newUser";
import Job from "../../models/job/job";
import Application from "../../models/employer/application";

export const applyToJob = async (req: Request, res: Response) => {
  const { userId, jobId } = req.body;

  try {
    if (!userId || !jobId) {
      res.status(400).json({ message: "User ID and Job ID are required" });
      return;
    }

    const applicant = await Applicant.findById(userId);
    const job = await Job.findById(jobId);

    if (!job) {
      res.status(404).json({ message: "Job not found" });
      return;
    }

    if (applicant.appliedTo.includes(jobId)) {
      applicant.appliedTo = applicant.appliedTo.filter((job) => job !== jobId);
      await applicant.save();
      await Application.findOneAndDelete({ jobId, applicantId: applicant._id });

      res.status(200).json({ message: "Successfully withdrawn application" });
      return;
    }

    applicant.appliedTo.push(jobId);
    await applicant.save();
    await Application.create({
      jobId,
      applicantId: applicant._id,
      jobName: job.role,
      employerId: job.employerId,
      applicantName: applicant.firstName + " " + applicant.lastName,
    });

    res.status(200).json({ message: "Successfully applied to job" });
  } catch (error) {
    console.error("Error in applyToJob:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const saveJobs = async (req: Request, res: Response) => {
  const { userId, jobId } = req.body;

  try {
    if (!userId || !jobId) {
      res.status(400).json({ message: "User ID and Job ID are required" });
      return;
    }

    const applicant = await Applicant.findById(userId);
    const job = await Job.findById(jobId);

    if (!job) {
      res.status(404).json({ message: "Job not found" });
      return;
    }

    if (applicant.savedJobs.includes(jobId)) {
      applicant.savedJobs.filter((job) => job !== jobId);
      await applicant.save();

      res.status(200).json({ message: "Successfully unsaved this job" });
      return;
    }

    applicant.savedJobs.push(jobId);
    await applicant.save();

    res.status(200).json({ message: "Successfully saved this job" });
  } catch (error) {
    console.error("Error in applyToJob:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getAppliedJobs = async (req: Request, res: Response) => {
  const userId = req.query.userId;

  try {
    const applicant = await Applicant.findOne({ _id: userId });
    const appliedJobs = await Job.find({ _id: { $in: applicant.appliedTo } });
    res.status(200).json(appliedJobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getSavedJobs = async (req: Request, res: Response) => {
  const userId = req.query.userId;

  try {
    const applicant = await Applicant.findOne({ _id: userId });
    const savedJobs = await Job.find({ _id: { $in: applicant.savedJobs } });
    res.status(200).json(savedJobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
