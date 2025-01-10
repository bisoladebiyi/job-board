import { Request, Response } from "express";
import Job from "../models/job/job";

export const getJobs = async (req: Request, res: Response) => {
  const { date, model } = req.body;
  const now: any = new Date();
  let dateToGet = null;
  let query: any = {};

  try {
    if (date === "24") {
      dateToGet = new Date(now - 24 * 60 * 60 * 1000);
    } else if (date === "week") {
      dateToGet = new Date(now - 7 * 24 * 60 * 60 * 1000);
    } else if (date === "month") {
      dateToGet = new Date(now.setMonth(now.getMonth() - 1));
    }

    if (dateToGet) {
      query.createdAt = { $gte: dateToGet };
    }

    if (model && ["onsite", "hybrid", "remote"].includes(model)) {
      query.model = model;
    }

    const jobs = await Job.find(query);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getJob = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const job = await Job.findById(id);
    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getEmployerActiveJobs = async (req: Request, res: Response) => {
  const userId = req.query.userId;

  try {
    const jobs = await Job.find({
      employerId: userId,
      $or: [{ isArchived: { $exists: false } }, { isArchived: false }],
    });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getEmployerArchivedJobs = async (req: Request, res: Response) => {
  const userId = req.query.userId;

  try {
    const jobs = await Job.find({ employerId: userId, isArchived: true });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
