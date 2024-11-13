import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import Employer from '../../models/employer/newUser'

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id: any) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
}

export const employerSignUp = async (req: Request, res: Response) => {
    try {
        const employer = await Employer.create(req.body)
        const token = createToken(employer.id);
        res.status(200).json({ token, companyName: employer.companyName, companyWebsite: employer.companyWebsite, email: employer.email })
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export const employerLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const employer = await Employer.findOne({ email });
        if (!employer) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const isMatch = await employer.comparePassword(password);

        if (!isMatch) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }
        const token = createToken(employer.id);
        res.status(200).json({ token, companyName: employer.companyName, companyWebsite: employer.companyWebsite, email: employer.email })
    } catch (error) {
        res.status(500).json({ error: error.message || 'Server error' });
    }
}