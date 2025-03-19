import { Router } from "express";
import multer from "multer";
import {
  uploadVideo,
  getVideosByCategory,
} from "../controllers/video.controller.js";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("file"), uploadVideo);

// Route for fetching videos by category
router.get("/category/:category", getVideosByCategory);

export default router;
