import { applicantLogin, applicantSignUp } from '../controllers/applicant/auth.controller';
import { employerLogin, employerSignUp } from '../controllers/employer/auth.controller';
import express from 'express';

export const router = express.Router();

router.post('/login?type=employer', employerLogin)
router.post('/login', applicantLogin)

router.post('/signup?type=employer', employerSignUp)
router.post('/signup', applicantSignUp)