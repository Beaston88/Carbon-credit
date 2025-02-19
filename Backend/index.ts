import express, { Request, Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3300;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response) => {
  res.status(200).json({ message: "Api Working..." });
});

app.listen(port, () => console.log("Server is running on port 3000"));
