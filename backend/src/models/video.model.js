import mongoose, { Schema } from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,

  category: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
});

videoSchema.index({ category: 1 });

export default mongoose.model("Video", videoSchema);
