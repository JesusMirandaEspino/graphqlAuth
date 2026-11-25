import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDataBase } from "./config/database.config.ts";

import { authRouter } from "./routes/auth.routes.ts";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);


app.listen( process.env.PORT, async () => {
    console.log("app running");
    await connectDataBase();
});



