import { Document } from "mongoose";

export interface EIUser extends Document {
    companyName: string;
    companyWebsite: string;
    isEmployer: boolean;
    email: string;
    password: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}