import { User } from "../models/user.models.js";

const registerUser = async (req, res) => {
  const { username, password, email } = req.body;

  if ([username, password, email].some((field) => field?.trim() === "")) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) {
    return res.status(400).json({ message: "User already exist" });
  }
  const user = await User.create({
    username,
    email,
    password,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    res.status(500).json({ message: "Failed to create user" });
  }
  return res.status(200).json({ message: "User created" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: "email is required" });
  }
  const user = await User.findOne({
    email,
  });
  if (!user || !(await user.isPasswordCorrect(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);
  const loggedUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: false,
    sameSite: "None",
    secure: true,
  };
  return res.status(200).cookie("accessToken", accessToken, options).json({
    message: "User logged in successfully",
    user: loggedUser,
    accessToken,
    refreshToken,
  });
};

const logoutUser = async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  await User.findByIdAndUpdate(
    userId,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );
  await user.save({ validateBeforeSave: false });
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ message: "User logged out successfully" });
};

const getCurrentUser = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }
  return res.status(200).json({ user: req.user });
};

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.error("Error generating access token and refresh token:", error);
    res
      .status(500)
      .json({ message: "Failed to generate access token and refresh token" });
  }
};

const refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
  try {
    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
    const { accessToken } = await generateAccessTokenAndRefreshToken(user._id);
    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });
    return res.status(200).json({ message: "Access token refreshed" });
  } catch (error) {
    console.error("Error refreshing access token:", error);
  }
};

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
};
