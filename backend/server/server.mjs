import express from "express";
import cors from "cors";
import multer from "multer";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { conn, upload, gfs } from "./database.mjs";
import mongodb from "mongodb";
import cron from "node-cron";
const port = process.env.PORT || 5000;
const app = express();

// Function to delete files based on endDate
async function deleteExpiredFiles() {
  const currentDate = new Date();

  try {
    // const file = await gfs.files.find({ _id: objId }).toArray();
    const filesToUPdate = await gfs.files
      .find({ "metadata.endDate": { $lt: currentDate } })
      .toArray();

    if (filesToUPdate.length > 0) {
      await gfs.files.updateMany(
        {
          "metadata.endDate": { $lt: currentDate }, // Ensures only files with future endDates are updated
        },
        { $set: { "metadata.category": "archive" } }
      );
      console.log("files greater than 0");
    }
  } catch (err) {
    console.log("error on server");
  }

  console.log("Expired files deleted, remaining files:");
}

// Schedule the cron job to run every minute
cron.schedule("30 1 * * *", deleteExpiredFiles);

const devFrontend = "*"; // replace with your dev server address
const prodFrontend = "https://octopus-app-39r48.ondigitalocean.app";

// Use the NODE_ENV to determine the current environment
const frontendUrl =
  process.env.NODE_ENV === "production" ? prodFrontend : devFrontend;

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

app.post("/addFile", upload.single("img"), async (req, res) => {
  res.json(req.file);
});

app.get("/imageNames", async (req, res) => {
  const category = req.query.category;
  const month = req.query.month;
  const year = req.query.year;
  let fileNames = [];
  try {
    if (req.query.category === "all") {
      let files = await gfs.files
        .find({
          "metadata.month": month,
          "metadata.year": year,
        })
        .toArray();
      fileNames = files.map((file) => file.filename);

      if (fileNames.length > 0) {
        res.send(files);
      } else {
        res.send("No files found");
      }
    } else {
      let files = await gfs.files
        .find({
          "metadata.category": category,
          "metadata.month": month,
          "metadata.year": year,
        })
        .toArray();
      fileNames = files.map((file) => file.filename);

      if (fileNames.length > 0) {
        res.send(files);
      } else {
        res.send("No files found");
      }
    }
  } catch (err) {
    console.log("error", err);
    res.send(err);
  }
});

import { ObjectId } from "mongodb";

app.delete("/deleteFile", async (req, res) => {
  const id = req.body.id; // Get the id from the request body
  console.log(req.body.filename);
  try {
    // Check if file exists in the db
    const objId = new ObjectId(id);
    // const file = await gfs.files.find({ _id: objId }).toArray();
    const file = await gfs.files
      .find({ filename: req.body.filename })
      .toArray();

    console.log(file);
    if (!file) {
      return res.status(404).send({ message: "File not found." });
    }

    await gfs.files.updateMany(
      { filename: req.body.filename },
      { $set: { "metadata.category": "archive" } }
    );

    res.send({ message: "File deleted successfully." });
  } catch (err) {
    res
      .status(500)
      .send({ message: "An error occurred while deleting the file." });
  }
});

// dates
const date = new Date();

app.get("/images", async (req, res) => {
  const category = req.query.category;
  const month = req.query.month;
  const year = req.query.year;

  try {
    let files = await gfs.files
      .find({
        "metadata.category": category,
        "metadata.month": month,
        "metadata.year": year,
      })
      .toArray();
    const fileNames = files.map((file) => file.filename);

    if (fileNames.length > 0) {
      res.send(fileNames);
    } else {
      res.send("No files found");
    }
  } catch (err) {
    res.send(err);
  }
});

app.get("/images/:filename", (req, res) => {
  const { filename } = req.params;
  const bucket = new mongodb.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });

  try {
    bucket
      .openDownloadStreamByName(filename)
      .on("error", () => {
        res.status(404).send(`No file with the name ${filename}`);
      })
      .pipe(res);
  } catch (error) {
    console.error("Error getting ObjectIDs:", error);
  }
});

app.listen(port, () => {
  console.log(`Server is running ${port}`);
});
