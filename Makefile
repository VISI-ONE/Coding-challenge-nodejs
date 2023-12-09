# Create and start the test database
init-db-test :
	rm -f priceboard_test.db
	NODE_ENV=test npx knex migrate:latest
	NODE_ENV=test npx knex seed:run

