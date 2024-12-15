import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose";
import { router as AuthRouter } from "./routes/auth.route";
import { router as ApplicantDataRouter } from "./routes/applicant/applicantData.route";
import { router as ApplicantJobsRouter } from "./routes/applicant/applicantJobs.route";

const app = express();

const port = process.env.PORT || 8888;

dotenv.config()
app.use(express.json());
app.use(cors());
// app.set('trust proxy', true);

app.use((req, res, next) => {
    next();
});

app.use('/api/auth', AuthRouter)
app.use('/api/applicant', ApplicantDataRouter)
app.use('/api/applicant/jobs', ApplicantJobsRouter)

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(
                `Server is connected to db and running on port ${port}`
            );
        });
    })
    .catch((err) => console.error(err));
