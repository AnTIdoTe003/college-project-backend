import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import User from "../models/userSchema.js";
import JWT from "jsonwebtoken";
export const userRegistrationController = async (req, res) => {
  try {
    const { name, password, email, phone, address, images } = req.body;
    console.log(req.body);
    if (!name) {
      return res.status(404).send({
        message: "Name not found",
        success: false,
      });
    } else if (!password) {
      return res.status(404).json({
        message: "Password not provided",
        success: false,
      });
    } else if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone is a required field.",
      });
    } else if (!address) {
      return res.status(400).json({
        success: false,
        message: "Address is a required field.",
      });
    } else if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    } else if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email not found",
      });
    }

    const existEmail = await User.findOne({ email: email });
    if (existEmail) {
      return res
        .status(400)
        .send({ success: false, message: "Email already exists" });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      name,
      password: hashedPassword,
      phone,
      email,
      address,
      images,
    });
    return res.status(201).json({
      success: true,
      message: "User registration successful.",
      user: newUser,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email: email });
    if (!existUser) {
      return res
        .status(401)
        .send({ success: false, message: "User does not exist" });
    }
    const matchPassword = await comparePassword(password, existUser.password);
    if (!matchPassword) {
      return res
        .status(401)
        .send({ success: false, message: "Please enter a valid password" });
    }

    // token
    const token = await JWT.sign(
      { _id: existUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    return res
      .setHeader("Content-Type", "application/json")
      .cookie("token", token, {
        expires: expirationDate,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send({
        success: true,
        message: "User Logged in successfully",
        existUser,
      });
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: "Error logging in user",
      error: error,
    });
    console.log(error);
  }
};
