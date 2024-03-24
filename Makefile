# Create and start the database
init-db:
	npx ts-node ./node_modules/.bin/knex migrate:latest
	npx ts-node ./node_modules/.bin/knex seed:run

# Start the Express app
start:
	npm run build && node dist/src/index.js