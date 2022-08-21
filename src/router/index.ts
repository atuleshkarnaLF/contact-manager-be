import { Router } from "express";
import userRouter from "./contactRouter";
import authRouter from "./authRouter";
import tokenRouter from "./tokenRouter";
import { authenticate } from "../middlewares/authenticate";

const router = Router();

router.use("/auth", authRouter);
router.use("/token", tokenRouter);
router.use(authenticate);

router.use("/contacts", userRouter);

export default router;
