import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { AIUser } from "../../interface/applicant/user.interface";

const Schema = mongoose.Schema;

const userSchema = new Schema<AIUser>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isEmployer: {
        type: Boolean,
        required: true
    }
})

userSchema.pre<AIUser>('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

        next();
    } catch (err) {
        next(err);
    }
});


userSchema.methods.comparePassword = async function (candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password);
};



export default mongoose.model('Applicant', userSchema)