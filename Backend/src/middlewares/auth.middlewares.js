import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const accessToken =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!accessToken) {
      res.status(401).json({ message: "Access Token is missing" });
    }
    const tokenPayload = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = await User.findById(tokenPayload?.id).select(
      "-password -refreshToken"
    );
    if (!req.user) {
      res.status(401).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid access token" });
  }
};
