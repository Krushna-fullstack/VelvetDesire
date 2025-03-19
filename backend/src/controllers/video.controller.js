import Video from "../models/video.model.js";
import { uploadToGCS } from "../utils/gcpStorage.js";

// Upload a video file and save metadata
export const uploadVideo = async (req, res) => {
  try {
    // 'file' is attached by multer
    const file = req.file;
    const { title, description, category } = req.body;
    if (!file || !title || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Upload video to GCP
    const videoUrl = await uploadToGCS(file);

    // Save metadata to MongoDB
    const video = new Video({ title, description, category, videoUrl });
    await video.save();

    res.status(201).json({ message: "Video uploaded successfully", video });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get videos by category
export const getVideosByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const videos = await Video.find({ category }).sort({ uploadedAt: -1 });
    res.json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
