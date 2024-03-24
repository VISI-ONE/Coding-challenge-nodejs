import express from "express";

import bodyParser from "body-parser";

import { tenantRouter } from "./routes/index.js";

import { db } from "./repository/index.js";

const app = express();
app.use(bodyParser.json());

// Initialize the database connection
db.init();

// Express API routes for CRUD operations
app.use("/api/v1/", tenantRouter);

// catch all errors
app.use((error, req, res, next) => {
  //   console.error("here", error.statusCode, error.message, error.stack);
  res
    .status(error.statusCode || 500)
    .json({ message: error.message ?? "Internal Server Error" });
  next();
});

export default app;

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
