import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose";
import { router as AuthRouter } from "./routes/auth.route";

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
