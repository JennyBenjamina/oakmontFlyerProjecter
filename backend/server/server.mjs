import express from "express";
import cors from "cors";
import { upload, addMetadata } from "./database.mjs";
import Photo from "../models/photo.mjs";

import { uploadToS3 } from "./s3.mjs";
import cron from "node-cron";
const port = process.env.PORT || 5000;
const app = express();

// Function to delete files based on endDate
async function deleteExpiredFiles() {
  const currentDate = new Date();

  try {
    let updatedFile = await Photo.updateMany(
      { endDate: { $lt: currentDate } },
      { $set: { category: "archive" } } // Update the category to "archive"
    );

    console.log(updatedFile);
  } catch (err) {
    console.log("error on server");
  }

  console.log("Expired files deleted, remaining files:");
}

// Schedule the cron job to run every minute
cron.schedule("30 1 * * *", deleteExpiredFiles);

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

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/addFile", upload.single("img"), addMetadata, async (req, res) => {
  const { error, imgName } = uploadToS3({
    file: req.file,
    userId: "123",
    key: req.photoKey,
  });

  res.send("success");
});

app.get("/imageNames", async (req, res) => {
  const category = req.query.category;
  const month = req.query.month;
  const year = req.query.year;

  try {
    let files = [];
    if (req.query.category === "all") {
      files = await Photo.find({
        month: month,
        year: year,
      });
    } else {
      files = await Photo.find({
        category: category,
        month: month,
        year: year,
      });
    }

    const fileNames = files.map((file) => file.imageUrl);
    if (fileNames.length > 0) {
      res.send(fileNames);
    } else {
      res.send("No files found");
    }
  } catch (err) {
    res.send(err);
  }
});

app.delete("/deleteFile", async (req, res) => {
  console.log(req.body);
  try {
    let updatedFile = await Photo.findOneAndUpdate(
      { imageUrl: req.body.filename }, // Assuming req.body.imageUrl contains the imageUrl
      { $set: { category: "archive" } }, // Update the category to "archive"
      { new: true } // Return the updated document
    );

    console.log(updatedFile);
    if (!updatedFile) {
      return res.status(404).send({ message: "File not found." });
    }

    res.send({ message: "File deleted successfully." });
  } catch (err) {
    res
      .status(500)
      .send({ message: "An error occurred while deleting the file." });
  }
});

app.get("/images", async (req, res) => {
  const category = req.query.category;
  const month = req.query.month;
  const year = req.query.year;

  try {
    let files = await Photo.find({
      category: category,
      month: month,
      year: year,
    });
    const fileNames = files.map((file) => file.imageUrl);

    if (fileNames.length > 0) {
      res.send(fileNames);
    } else {
      res.send("No files found");
    }
  } catch (err) {
    res.send(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running ${port}`);
});
