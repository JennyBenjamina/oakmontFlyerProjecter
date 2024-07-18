import mongoose from "mongoose";
const photoSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["men", "women", "etiquette", "misc"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  month: Number,
  year: Number,
  endDate: {
    type: Date,
    required: true,
  },
});

const Photo = mongoose.model("Photo", photoSchema);

export default Photo;
