import express, { Express, Response } from "express";
import cors from "cors";
import { credentials } from "./middleware/cors";
import { corsOptions } from "./config/corsOptions";
import "../mongoose/mongooseConnect";

const app: Express = express();
const port = process.env.PORT;

app.use(credentials);
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (_, response: Response) => {
  response.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
