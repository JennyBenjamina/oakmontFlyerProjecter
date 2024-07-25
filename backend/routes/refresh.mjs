import express from "express";
const router = express.Router();
import handleRefreshToken from "../controllers/refreshTokenController.mjs";

router.get("/", handleRefreshToken);

export default router;
