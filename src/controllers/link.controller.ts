import { Request, Response } from "express";
import { CastumRequest } from "../middlewares/auth";
import { LinksModel } from "../models/links.model";
import { UserModel } from "../models/user.model";

export const createLink = async (req: Request, res: Response) => {
  try {
    let data = req.body;
    const userId = (req as CastumRequest).userId;
    if (data.length > 1) {
      data = data.map((i: any) => {
        return {
          ...i,
          userId,
        };
      });
      const links = await LinksModel.insertMany(data);

      res.status(201).send({
        data: links,
        total_creation: links.length,
      });
    } else {
      data.userId = userId;
      const link = await LinksModel.create(data);
      res.status(201).send({
        data: link,
        total_creation: 1,
      });
    }
  } catch (error: any) {
    res.status(403).send({
      error: error.message,
      message: "creation error",
    });
  }
};

export const updateLink = async (req: Request, res: Response) => {
  try {
    let data = req.body;
    const _id = req.params.id;
    let links: any = [];
    if (data.length > 1) {
      for (let i = 0; i < data.length; i++) {
        const link = await LinksModel.updateOne(
          { _id },
          { $set: { name: data[i].name, link: data[i].link } }
        );
        links.push(link);
      }
    } else {
      const link = await LinksModel.updateOne(
        { _id: data._id },
        { $set: { name: data.name, link: data.link } }
      );
      links = link;
    }

    res.status(201).send({
      data: links,
    });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const getLinks = async (req: Request, res: Response) => {
  try {
    const userId = (req as CastumRequest).userId;
    const links = await LinksModel.find({ userId }, { __v: 0 }, {});

    res.status(200).send({
      data: links,
    });
  } catch (error: any) {
    res.status(500).send({
      error: error.message,
    });
  }
};

export const generateLink = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findOne({ _id: userId });
    const links = await LinksModel.find({ userId });

    if (links && user) {
      res.status(200).send({
        ...user,
        links,
      });
    } else {
      throw new Error("Could not find link for user");
    }
  } catch (error: any) {
    res.status(500).send({
      error: error.message,
    });
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const data = await UserModel.deleteOne({ _id: id });

    res.status(200).send({
      ...data,
    });
  } catch (error) {}
};
