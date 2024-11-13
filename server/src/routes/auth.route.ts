import { applicantLogin, applicantSignUp } from '../controllers/applicant/auth.controller';
import { employerLogin, employerSignUp } from '../controllers/employer/auth.controller';
import express from 'express';

export const router = express.Router();

router.post('/login?type=employer', employerLogin)
router.post('/login', applicantLogin)

router.post('/sign-up?type=employer', employerSignUp)
router.post('/sign-up', applicantSignUp)