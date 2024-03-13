# Timing Breakdown

Following is the breakdown of the time spent on the improvements.

 - Repository setup, goin through readme and understanding the task (15 mins)
 - Creating the migration and seed file for vehicles (15mins)
 - Creating enpoints for vehicles, creating endpoint for pairing vehicle and priceboard where the tenant id is same (50mins)

 If I had time I would have done the remaining improvements in the following manner

  - Refactoring: use controllers and services to separate business logic and routes.
  - Write test for endpoints. Use arrestion on the response of the api to check for correctness. e.g expect(res).to.have.status(200)
  - Providin the Docker file to run the application in a Docker container.

  ## Further improvements

  - added testing for api routes. (20mins)
  - added dockerfile (15mins)