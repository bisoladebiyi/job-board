import { Document } from "mongoose";

export interface AIUser extends Document {
    firstName: string;
    lastName: string;
    occupation: string;
    isEmployer: boolean;
    email: string;
    password: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
    resume?: any;
    appliedTo?: string[],
    savedJobs?: string[]
}