import mongoose from "mongoose";

const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    employerId: {
        type: String,
        required: true
    },
    applicantId: {
        type: String,
        required: true
    },
    applicantName: {
        type: String,
        required: true
    },
    jobId: {
        type: String,
        required: true
    },
    jobName: {
        type: String,
        required: true
    },
    status: {
        type: Schema.Types.Mixed
    }
})

export default mongoose.model('Application', applicationSchema)