const  app  = require('./app');

const start = async () => {
  const port = process.env.PORT || 3000;
  
  // Start the Express server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

start();
