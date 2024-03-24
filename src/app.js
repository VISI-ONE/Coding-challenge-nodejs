import express from "express";

import bodyParser from "body-parser";

import { tenantRouter, vehicleRouter } from "./routes/index.js";

const app = express();
app.use(bodyParser.json());

// Express API routes for CRUD operations
app.use("/api/v1/", [tenantRouter, vehicleRouter]);

// catch all errors
app.use((error, req, res, next) => {
  //   console.error("here", error.statusCode, error.message, error.stack);
  res
    .status(error.statusCode || 500)
    .json({ message: error.message ?? "Internal Server Error" });
  next();
});

export default app;
