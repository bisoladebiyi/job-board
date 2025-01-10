import { Request, Response } from "express";
import Application from "../../models/employer/application";
import Applicant from "../../models/applicant/newUser";
import Job from "../../models/job/job";

export const getApplications = async (req: Request, res: Response) => {
  const { employerId } = req.params;

  try {
    const applications = await Application.find({ employerId });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message || "Server error" });
  }
};

export const getApplicationDetails = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const application = await Application.findOne({ _id: id });
    const applicant = await Applicant.findById(application.applicantId);
    const job = await Job.findById(application.jobId);
    res.status(200).json({ ...application, applicant, job });
  } catch (error) {
    res.status(500).json({ error: error.message || "Server error" });
  }
};

export const changeApplicationStatus = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const application = await Application.findByIdAndUpdate(id, req.body);
    res
      .status(200)
      .json({ message: "Application status updated", application });
  } catch (error) {
    res.status(500).json({ error: error.message || "Server error" });
  }
};

export const deleteApplication = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const application = await Application.findByIdAndDelete(id);
    const applicant = await Applicant.findById(application.applicantId);
    applicant.appliedTo = applicant.appliedTo.filter(
      (job) => job !== application.jobId
    );
    await applicant.save();

    res.status(200).json({ message: "Application successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message || "Server error" });
  }
};
