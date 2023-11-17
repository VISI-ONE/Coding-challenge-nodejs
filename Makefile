# Create and start the database
init-db:
	npx knex migrate:latest
	npx knex seed:run

# Start the Express app
start:
	node index.js

# Run tests
run-tests:
	npx jest