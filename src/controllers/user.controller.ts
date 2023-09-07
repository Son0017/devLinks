import { Request, Response } from "express";
import validate from "deep-email-validator";
import { UserModel } from "../models/user.model";
import jwt from "jsonwebtoken";
import { CastumRequest } from "../middlewares/auth";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const response = await validate(email);
    console.log(response);

    if (response.valid) {
      const user = await UserModel.findOne({
        email,
        password,
      });
      console.log(user);

      if (user) {
        const token = jwt.sign(
          {
            userId: user._id,
          },
          process.env.SECRET_KEY as string
        );

        res.cookie("token", token).send({
          firstname: user.firstname,
          lastname: user.lastname,
          image: user.image,
        });
      } else {
        throw new Error("Email is not valid");
      }
    } else {
      throw new Error("Email is not valid");
    }
  } catch (error: any) {
    res.status(401).send(error.message);
  }
};

export const logup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const response = await validate(email);

    if (response.valid) {
      const user = await UserModel.create({
        email,
        password,
      });

      if (user) {
        const token = jwt.sign(
          {
            userId: user._id,
          },
          process.env.SECRET_KEY as string,
          {
            expiresIn: "30d",
          }
        );

        res.cookie("token", token).send({
          firstname: user.firstname,
          lastname: user.lastname,
          image: user.image,
        });
      }
    }
  } catch (error: any) {
    res.status(401).send(error.message);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, image, email, password } = req.body;
    const userId = (req as CastumRequest).userId;
    console.log(userId);

    const user = await UserModel.updateOne(
      {
        _id: userId,
      },
      {
        $set: {
          firstname,
          lastname,
          image,
          email,
          password,
        },
      }
    );
    res.status(200).send({
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};
