import express, { Request, Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3200;

import indexRoutes from "./src/routes/index.route";

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", indexRoutes);

app.use((req: Request, res: Response) => {
  res.status(200).json({ message: "Api Working..." });
});

app.listen(port, () => console.log("Server is running on port", port));
