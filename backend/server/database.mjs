import mongoose from "mongoose";
import Grid from "gridfs-stream";
import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

const conn = mongoose.createConnection(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "uploads",
        metadata: {
          category: req.query.category,
          month: req.query.month,
          year: req.query.year,
          endDate: new Date(req.query.endDate),
        },
      };
      resolve(fileInfo);
    });
  },
});

storage.on("error", (error) => {
  console.error(error);
});

const upload = multer({ storage });

console.log("Database connected successfully!");

export { conn, upload, gfs };
