import type { Request, Response } from "express";
import { User } from "../models/model.user.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user)
      return res.status(400).json({
        success: false,
        errors: {
          messages: ["users already exists"],
          token: null,
        },
      });

    const newUser = new User({ username: name, email, password });
    const salt = bcrypt.genSaltSync(12);
    newUser.password = bcrypt.hashSync(password, salt);

    await newUser.save();

    const payload = {
      id: newUser.id,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
      (error, token) => {
        if (error)
          returnes.status(500).json({
            success: false,
            errors: {
              messages: ["server Error", error],
              token: null,
            },
          });

        es.status(200).json({
          success: true,
          error: null,
          token,
          username: newUser.username,
          email: newUser.email,
          id: newUser.id,
        });
      },
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: {
        messages: ["server Error", error],
        token: null,
      },
    });
  }

  return res.send("register");
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.password;

  try {
    let user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        success: false,
        errors: {
          messages: [
            "Please make sure everything is fine, request failed. email or password wrong",
          ],
          token: null,
        },
      });

    const validatePassword = bcrypt.compareSync(password, user.password);

    if (!validatePassword)
      return res.status(400).json({
        success: false,
        errors: {
          messages: [
            "Please make sure everything is fine, request failed. email or password wrong",
          ],
          token: null,
        },
      });

    const payload = {
      id: user.id,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
      (error, token) => {
        if (error)
          returnes.status(500).json({
            success: false,
            errors: {
              messages: ["server Error", error],
              token: null,
            },
          });

        es.status(200).json({
          success: true,
          error: null,
          token,
          username: newUser.username,
          email: newUser.email,
          id: newUser.id,
        });
      },
    );
  } catch (err) {
    return res.status(500).json({
      success: false,
      errors: {
        messages: ["server Error", error],
        token: null,
      },
    });
  }

  return res.send("login");
};

export const changePassword = async (req: Request | any, res: Response) => {
  const uid = req.uid;

  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(uid);

    const validPassword = bcrypt.compareSync(oldPassword, user.password);

    if (!validPassword) {
      return res.status(500).json({
        success: false,
        errors: {
          messagges: ["Old password is incorrect"],
        },
        token: null,
      });
    }

    const salt = bcrypt.genSaltSync(12);
    const newPasswordHash = bcrypt.hashSync(newPassword, salt);

    await User.findByIdAndUpdate(uid, { password: newPasswordHash });

    return res.status(200).json({
      success: true,
      errors: null,
      token: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: {
        messagges: ["Server error", error],
      },
      token: null,
    });
  }
};

export const changeUsername = async (req: Request | any, res: Response) => {
  const uid = req.uid;

  const { name: username } = req.body;

  try {
    await User.findByIdAndUpdate(uid, { username });

    return res.status(200).json({
      success: true,
      errors: null,
      token: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: {
        messagges: ["Server error", error],
      },
      token: null,
    });
  }
};