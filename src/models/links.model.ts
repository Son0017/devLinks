import { Schema, model } from "mongoose";

interface Ilink {
  userId: string;
  name: string;
  link: string;
}

const Links = new Schema<Ilink>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  link: { type: String, required: true },
});

const LinksModel = model<Ilink>("user", Links);

export { LinksModel, Ilink };
