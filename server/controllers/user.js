import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email }).exec();

    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    // Can refactor with promises? remove await, .then(result) => {if(result) {} else {}}.catch() etc
    const checkPassword = await bcrypt.compare(password, existingUser.password);

    if (!checkPassword) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    // Just testing for now, need to generate new secret string instead of 'test' and move to env file.
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token: token });
  } catch (error) {
    res.status(500).json({ message: "Error signing in" });
  }
};

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email }).exec();

    if (existingUser) {
      return res
        .status(404)
        .json({ message: `User already exists with email ${email}` });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Can refactor with promises? remove await, .then(result) => {if(result) {} else {}}.catch() etc
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
    });

    // Just testing for now, need to generate new secret string instead of 'test' and move to env file.
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Error signing up" });
  }
};
