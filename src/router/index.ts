import { Router } from "express";
import userRouter from "./contactRouter";
import authRouter from "./authRouter";

const router = Router();

router.use("/auth", authRouter);
// router.use("/token", tokenRouter);
// router.delete("/logout", logoutRouter);
// router.use(authenticate);

router.use("/contacts", userRouter);

export default router;
