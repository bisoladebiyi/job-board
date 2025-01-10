import { Request, Response } from "express";
import multer from "multer";
import Applicant from "../../models/applicant/newUser";
const path = require("path");

// Multer Configuration: Store files in the uploads directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export const uploadResume = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const resume = req.file;

  try {
    const applicant = await Applicant.findById(userId);
    if (!applicant) {
      res.status(404).json({ message: "Applicant not found" });
      return;
    }

    applicant.resume = {
      originalName: resume.originalname,
      fileName: resume.filename,
      fileType: resume.mimetype,
      size: resume.size,
      uploadedAt: Date.now(),
    };

    await applicant.save();
    res.status(200).json({ message: "Resume uploaded successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getResume = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    const applicant = await Applicant.findOne({ id: userId });
    res.status(200).json(applicant.resume);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const uploadMiddleware = upload.single("resume");
