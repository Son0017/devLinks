import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB as string);
    console.log("db connection established");
  } catch (error: any) {
    console.log(error.message);
  }
};

export default connect;
