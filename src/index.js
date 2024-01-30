const app = require('./app');
const { getConfig } = require('./config');

const config = getConfig();

// Start the Express server
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
