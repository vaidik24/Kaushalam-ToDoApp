import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const userRouter = Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.post("/logout", verifyJWT, logoutUser);

userRouter.post("/refresh-token", refreshAccessToken);

userRouter.get("/current-user", verifyJWT, getCurrentUser);

export default userRouter;
