import dotenv from "dotenv";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import logger from "./misc/logger";
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";
import router from "./router";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use(router);

app.get("/", (req: Request, res: Response) => {
  res.send("API is running");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => logger.info("Server running on port " + PORT));
