import express from "express";
import cors from "cors";
import dbConn from "../config/dbConn.mjs";
import credentials from "../middleware/credentials.mjs";
import corsOptions from "../config/corsOptions.mjs";
import { logger } from "../middleware/logEvents.mjs";
import cookieParser from "cookie-parser";
import rootRouter from "../routes/root.mjs";
import authRouter from "../routes/auth.mjs";
import registerRouter from "../routes/register.mjs";
import refreshTokenRouter from "../routes/refresh.mjs";
import logoutRouter from "../routes/logout.mjs";

const port = process.env.PORT || 5000;
const app = express();

dbConn();

// allow all access for cors
// app.use(
//   cors({
//     origin: ["http://localhost:3000", "https://alternateshotmarketing.com"],
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use((req, res, next) => {
  console.log("Request received:", req.method, req.url);
  next();
});
// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(credentials);
app.use(logger);
app.use(cookieParser());
app.use("/", rootRouter);
app.use("/auth", authRouter);
app.use("/register", registerRouter);
app.use("/refresh", refreshTokenRouter);
app.use("/logout", logoutRouter);

app.listen(port, () => {
  console.log(`Server is running ${port}`);
});
