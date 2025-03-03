import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/";
import { errorHandler } from "./middleware/errorMiddleware";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", routes);
app.use(errorHandler)

export default app;
