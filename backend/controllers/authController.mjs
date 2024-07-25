import User from "../models/user.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  try {
    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized
  } catch (err) {
    console.error("error in found User");
    return res.sendStatus(500);
  }
  // evaluate password
  try {
    const match = await bcrypt.compare(pwd, foundUser.password);
  } catch (err) {
    console.log("error in match bcrypt");
    return res.sendStatus(502);
  }
  if (match) {
    try {
      const roles = Object.values(foundUser.roles).filter(Boolean);
      // create JWTs
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            roles: roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10s" }
      );
      const refreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      // Saving refreshToken with current user
      foundUser.refreshToken = refreshToken;
      const result = await foundUser.save();
      console.log(result);
      console.log(roles);
    } catch (err) {
      console.error("suuuuper error");
      return res.sendStatus(501);
    }

    try {
      // Creates Secure Cookie with refresh token
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });
    } catch (err) {
      return res.sendStatus(504);
    }

    // Send authorization roles and access token to user
    res.json({ roles, accessToken, isAuthenticated: true });
  } else {
    res.sendStatus(401);
  }
};

export default handleLogin;
