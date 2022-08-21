import { Router } from "express";
import * as contactController from "../controllers/contactController";

const router = Router();

router.get("/", contactController.getAllContacts);
router.get("/:contactId", contactController.getContactById);
router.post("/", contactController.createContact);
router.put("/:contactId", contactController.updateContact);
router.delete("/:contactId", contactController.deleteContact);

export default router;
