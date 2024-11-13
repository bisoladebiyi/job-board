import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { EIUser } from "../../interface/employer/user.interface";

const Schema = mongoose.Schema;

const userSchema = new Schema<EIUser>({
    companyName: {
        type: String,
        required: true
    },
    companyWebsite: {
        type: String,
        required: true
    },
    isEmployer: {
        type: Boolean,
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
})

userSchema.pre<EIUser>('save', async function (next) {
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


export default mongoose.model('Employer', userSchema)