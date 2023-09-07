import express from "express";
import { login, logup, updateUser } from "../controllers/user.controller";
import auth from "../middlewares/auth";

const router = express.Router();

router.post("/login", login);
router.post("/logup", logup);
router.patch("/", auth, updateUser);

export default router;
