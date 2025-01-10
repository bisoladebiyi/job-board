import mongoose from "mongoose";
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    employerId: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    salary: {
        type: String
    },
    desc: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    companyWebsite: {
        type: String,
        required: true
    },
    isArchived: {
        type: Boolean
    }
})

export default mongoose.model('Job', jobSchema)