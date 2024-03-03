const express = require("express");
const bodyParser = require("body-parser");
const tenantRoutes = require("./routes/tenant");

const app = express();
app.use(bodyParser.json());

app.use("/tenant", tenantRoutes);

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
