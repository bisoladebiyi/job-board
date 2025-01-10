import { Request, Response } from "express";
import Job from "../../models/job/job";

export const createJob = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const job = await Job.create(body);
    res.status(200).json({ message: "Job created successfully", job });
  } catch (error) {
    res.status(500).json({ error: error.message || "Server error" });
  }
};

export const editJob = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const job = await Job.findByIdAndUpdate(
      { _id: id },
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!job) {
      res.status(404).json({ error: "This job does not exist" });
      return;
    }

    res.status(200).json({
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Server error" });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const job = await Job.findByIdAndDelete({ _id: id });

    if (!job) {
      res.status(404).json({ error: "This job does not exist" });
      return;
    }

    res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Server error" });
  }
};
