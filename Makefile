# Create and start the database
init-db:
	npx knex migrate:latest
	npx knex seed:run

# Start the Express app on bare metal
start:
	node src/index.js

# Start the Express app containerized
up:
	docker-compose up --build

down:
	docker-compose down