import { getJobs } from '../controllers/jobs.controller';
import express from 'express';

export const router = express.Router();

router.get('/', getJobs);
