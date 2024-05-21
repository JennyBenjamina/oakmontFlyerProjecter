import express from "express";
import cors from "cors";
import multer from "multer";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { conn, upload, gfs } from "./database.mjs";
import mongodb from "mongodb";
const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Handles the file upload and stores the file in the uploads folder
 * and into the pinecone vector database
 * @param path for api endpoint
 * @param array of files from the multer object
 * @param callback function for request and response
 * @returns response with the request body
 */

app.post("/addFile", upload.single("img"), async (req, res) => {
  res.json(req.file);
});

// dates
const date = new Date();

app.get("/images", async (req, res) => {
  const category = req.query.category;
  const month = req.query.month;
  const year = req.query.year;

  console.log("category", category);
  console.log("month", month);
  console.log("year", year);

  try {
    let files = await gfs.files
      .find({
        "metadata.category": category,
        "metadata.month": month,
        "metadata.year": year,
      })
      .toArray();
    const fileNames = files.map((file) => file.filename);

    console.log("fileName", fileNames);

    if (fileNames.length > 0) {
      res.send(fileNames);
    } else {
      res.send("No files found");
    }
  } catch (err) {
    res.send(err);
  }
});

app.get("/images/:filename", async (req, res) => {
  const { filename } = req.params;
  const bucket = new mongodb.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });

  try {
    const files = await conn.db
      .collection("uploads.files")
      .find({ filename: filename })
      .toArray();
    console.log(files);

    bucket
      .openDownloadStreamByName(filename)
      .on("error", () => {
        res.status(404).send(`No file with the name ${filename}`);
      })
      .pipe(res);

    console.log(files);
  } catch (error) {
    console.error("Error getting ObjectIDs:", error);
  }
});

app.listen(() => {
  console.log(`Server is running`);
});
