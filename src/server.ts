import express from "express";
import { config } from "dotenv";
import cookie from "cookie-parser";
import connect from "./connection/dbConnection";
import router from "./routes/user.routes";
config();
connect();

const app = express();
app.use(express.json());
app.use(cookie());
app.use("/user", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("listening on port" + PORT);
});
