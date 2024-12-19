import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const verifyJwt = asyncHandler(async (req, _, next) => {
  // Get token from either cookies or Authorization header
  const token =
    req.cookies.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "").trim();

  // Debugging: Log the token to check if it's being received
  console.log("Token received:", token);

  // Check if token is missing
  if (!token) {
    throw new ApiError(401, "Unauthorized: Token not found");
  }

  try {
    // Verify the token using the ACCESS_TOKEN_SECRET
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Find user by the decoded token ID
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

    // Check if user exists
    if (!user) {
      throw new ApiError(401, "Unauthorized: User not found");
    }

    // Attach user to the request object for use in subsequent middleware or routes
    req.user = user;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    // Handle any errors related to token verification
    console.error("JWT Verification Error:", error);  // Log the error
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export {};