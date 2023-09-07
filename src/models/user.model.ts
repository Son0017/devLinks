import { Schema, model } from "mongoose";

interface Iuser {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  image: string;
}

const User = new Schema<Iuser>({
  email: {
    type: String,
    required: true,
  },
  firstname: String,
  lastname: String,
  image: String,
  password: {
    type: String,
    required: true,
  },
});

const UserModel = model<Iuser>("user", User);

export { UserModel, Iuser };
