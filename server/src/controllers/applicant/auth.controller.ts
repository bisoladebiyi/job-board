import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import Applicant from '../../models/applicant/newUser'

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id: any) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
}

export const applicantSignUp = async (req: Request, res: Response) => {
    try {
        const applicant = await Applicant.create(req.body)
        const token = createToken(applicant.id);
        res.status(200).json({ token, id: applicant.id, firstName: applicant.firstName, lastName: applicant.lastName, occupation: applicant.occupation, email: applicant.email })
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export const applicantLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const applicant = await Applicant.findOne({ email });
        if (!applicant) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const isMatch = await applicant.comparePassword(password);

        if (!isMatch) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }
        const token = createToken(applicant.id);
        res.status(200).json({ token, id: applicant.id, firstName: applicant.firstName, lastName: applicant.lastName, occupation: applicant.occupation, email: applicant.email })
    } catch (error) {
        res.status(500).json({ error: error.message || 'Server error' });
    }
}