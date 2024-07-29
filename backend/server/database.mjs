import multer, { memoryStorage } from "multer";
import Photo from "../models/photo.mjs";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
dotenv.config();

const storageMemory = memoryStorage();

const upload = multer({ storageMemory }); // using storageMemory allows for the buffer key to show up. Otherwise, it's the ObjectId

// Middleware to add metadata to the file object
async function addMetadata(req, res, next) {
  if (req.file) {
    const key = `${req.query.category}/${uuid()}`;
    req.photoKey = key;
    const photoFile = new Photo({
      category: req.query.category,
      month: req.query.month,
      year: req.query.year,
      endDate: new Date(req.query.endDate),
      imageUrl: key,
    });
    await photoFile.save();
  }
  next();
}

export { upload, addMetadata };
