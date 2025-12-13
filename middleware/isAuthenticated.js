import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Company from "../models/company.model.js";

const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token invalid or expired" });
    }

    // Token MUST contain { id, role }
    if (!decoded.id || !decoded.role) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid token payload" });
    }

    // =========================================================
    // Attach user or company based on role
    // =========================================================

    if (decoded.role === "user") {
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = user;
      req.role = "user";
    }

    else if (decoded.role === "employer") {
      const company = await Company.findOne({ owner: decoded.id }).populate(
        "owner",
        "-password"
      );

      if (!company) {
        return res.status(404).json({ message: "Company profile not found" });
      }

      req.company = company;

      // To simplify job posting logic
      req.user = { id: decoded.id };
      req.role = "employer";
    }

    else {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid user role" });
    }

    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res
      .status(500)
      .json({ message: "Server error in authentication" });
  }
};

export default isAuthenticated;
