import dotenv from "dotenv";

import app from "./app.js";
import { db } from "./repository/index.js";

// Load environment variables from .env file
dotenv.config();

// Initialize the database connection
db.init();

// Start the Express server

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
