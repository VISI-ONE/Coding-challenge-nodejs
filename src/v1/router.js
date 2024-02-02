const tenant = require("./services/tenant.service");


module.exports = function (app) { 
  app.use("/api/v1", tenant);
  // eventually we add more services here
  // I prefer manual adding to make it more readable and customizable, but we could also use a loop to add all services
}