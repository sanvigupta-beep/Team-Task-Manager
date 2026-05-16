import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// POST /api/auth/signup
export const signup = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    res.status(400);
    throw new Error("Email is already registered");
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role === "admin" ? "admin" : "member",
  });

  res.status(201).json({
    user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    token: generateToken(user._id),
  });
});

// POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.json({
    user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    token: generateToken(user._id),
  });
});

// GET /api/auth/me
export const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});
