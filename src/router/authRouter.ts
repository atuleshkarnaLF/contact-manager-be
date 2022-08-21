import { Router } from "express";
import * as loginController from "../controllers/loginController";

const router = Router();

router.post("/login", loginController.login);
router.post("/signup", loginController.createUser);

export default router;
