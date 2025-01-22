import "reflect-metadata";
import "@shared/container";
import express from "express";
import cors from "cors";

import { appConfig } from "@config/app";
import { router } from "./routes";
import { handleErrors } from "./middlewares/handleErrors";

const app = express();
const { port } = appConfig;

app.use(express.json());

app.use(
  cors({
    origin: "*"
  })
);

app.use(router);

app.get("/", (req, res) => {
  res.json({ success: true });
});

app.use(handleErrors);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
