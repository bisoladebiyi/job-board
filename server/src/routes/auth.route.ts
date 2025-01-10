import { applicantLogin, applicantSignUp } from '../controllers/applicant/auth.controller';
import { employerLogin, employerSignUp } from '../controllers/employer/auth.controller';
import express from 'express';

export const router = express.Router();

router.post('/login', (req, res) => {
    const type = req.query.type

    if (type === "employer") {
        employerLogin(req, res)
    } else {
        applicantLogin(req, res)
    }
})

router.post('/signup', (req, res) => {
    const type = req.query.type

    if (type === "employer") {
        employerSignUp(req, res)
    } else {
        applicantSignUp(req, res)
    }
})
