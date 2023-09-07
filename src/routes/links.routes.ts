import express from "express";
import auth from "../middlewares/auth";
import {
  createLink,
  destroy,
  generateLink,
  getLinks,
  updateLink,
} from "../controllers/link.controller";

const router = express.Router();

router.get("/", auth, getLinks);
router.get("/:id", generateLink);
router.delete("/:id", destroy);
router.post("/", auth, createLink);
router.patch("/:id", auth, updateLink);

export default router;
