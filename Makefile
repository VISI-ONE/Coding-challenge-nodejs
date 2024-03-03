# Create and start the database
init-db:
	npx knex migrate:latest
	npx knex seed:run

# Start the Express app
start:
	node index.js

test: 
	rm priceboard.db
	make init-db
	npm test
