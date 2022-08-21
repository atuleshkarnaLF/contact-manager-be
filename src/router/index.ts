import { Router } from "express";
import userRouter from "./contactRouter";

const router = Router();

router.use("/contacts", userRouter);

export default router;
