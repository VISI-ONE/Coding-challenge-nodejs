# Setup and run app

1. buid container
   `npm run d:build`

2. login into container
   `npm run d:login`

3. install dependencies
   `npm install`

4. seed db
   `npm run db:seed`

5. run dev
   `npm run start:dev`

# Setup and run tests

1. buid container
   `npm run d:build`

2. login into container
   `npm run d:login`

3. install dependencies
   `npm install`

4. run tests
   `npm run test`

# VISI-ONE Coding challenge

Welcome! Thank you for taking the time to apply. We value your time, so please limit yourself to 90 minutes for the solution. Please add a file with your actual time taken and any improvements that you would make to your solution, if you were given additional time. This keeps it fair for everyone.

The API has been built with Node.js, Express, SQLite, and Knex.js. We would like you to improve a few things.

## Things to Improve

- Refactor the Express API handlers to follow best practices and maintainability.
- Write unit tests for the Express API handlers using a testing framework of your choice.
- Add a Dockerfile for the project and provide commands to build and run the application inside a Docker container. Ensure ports are properly exposed.
- Create a migration for a new entity, "vehicles" and add an endpoint to retrieve vehicles.
- Add an endpoint that allows the pairing of a vehicle with a priceboard, but only if the priceboard and vehicle belong to the same tenant.

## Setup

1. Clone the project:

   ```bash
   git clone git@github.com:VISI-ONE/Coding-challenge-nodejs.git
   cd Coding-challenge-nodejs
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Initialize the database and seed data:

   ```bash
   make init-db
   ```

4. Start the Express app:

   ```bash
   make start
   ```

The API will be accessible at `http://localhost:3000`.

## Database Migrations and Seeding

- Database migrations and seeding are managed using Knex.js. To create new migrations and seed data, use the following commands:

  - Create a new migration:

    ```bash
    npx knex migrate:make migration_name
    ```

  - Run migrations:

    ```bash
    npx knex migrate:latest
    ```

  - Create a new seed file:

    ```bash
    npx knex seed:make seed_name
    ```

  - Run seed data:
    ```bash
    npx knex seed:run
    ```

## Collaborating

1. Fork this repository to your own GitHub account.
2. Clone your forked repository and make changes as needed.
3. Create a new branch for your changes:

   ```bash
   git checkout -b your-name/your-branch-name
   ```

4. Commit your changes and push to your GitHub repository:

   ```bash
   git add .
   git commit -m "Add your commit message here"
   git push origin your-name/your-branch-name
   ```

5. Create a Pull Request (PR) from your repository to the original repository.

6. The project owner will review your PR and provide feedback. Please be patient, we will try to send feedback within a week.

## Postman Collection

Please create and include a Postman collection in the project that calls the endpoints. This will facilitate testing and documentation of the API.

```
{
	"info": {
		"_postman_id": "49d07524-dd4e-4609-b3d8-49cd16c5a2f4",
		"name": "Tenant Api",
		"schema": "https://schema.getpostman.com/json/collection/v2.0.0/collection.json",
		"_exporter_id": "3319783",
		"_collection_link": "https://www.postman.com/anton-syrovatka/workspace/anton-syrovatka/collection/3319783-49d07524-dd4e-4609-b3d8-49cd16c5a2f4?action=share&source=collection_link&creator=3319783"
	},
	"item": [
		{
			"name": "Get Tenant Priceboards",
			"request": {
				"method": "GET",
				"header": []
			},
			"response": []
		},
		{
			"name": "Get Tenant Vehicles",
			"request": {
				"method": "GET",
				"header": []
			},
			"response": []
		},
		{
			"name": "Get PriceBoard by id",
			"request": {
				"method": "GET",
				"header": []
			},
			"response": []
		},
		{
			"name": "Pair Vehicle and Priceboard",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{ \n    \"priceboardId\": 1, \n    \"vehicleId\": 5 \n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": "{{baseUrl}}/tenant/1/vehicle-priceboar"
			},
			"response": []
		}
	],
	"event": [
		{
			"listen": "prerequest",
			"script": {
				"type": "text/javascript",
				"exec": [
					""
				]
			}
		},
		{
			"listen": "test",
			"script": {
				"type": "text/javascript",
				"exec": [
					""
				]
			}
		}
	],
	"variable": [
		{
			"key": "baseUrl",
			"value": "http://localhost:3000"
		}
	]
}

```
