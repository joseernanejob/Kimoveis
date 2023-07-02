import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { handleError } from "./middlewares";
import {
  categoryRouter,
  sessionRouter,
  userRouter,
  realEstateRouter,
  scheduleRouter,
} from "./routes";

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/login", sessionRouter);
app.use("/categories", categoryRouter);
app.use("/realEstate", realEstateRouter);
app.use("/schedules", scheduleRouter);

app.use(handleError);

export default app;
