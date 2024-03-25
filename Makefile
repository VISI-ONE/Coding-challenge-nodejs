# Create and start the database
init-db:
	npx ts-node ./node_modules/.bin/knex migrate:latest
	npx ts-node ./node_modules/.bin/knex seed:run

init-app:
	npx ts-node ./node_modules/.bin/knex migrate:latest
	npx ts-node ./node_modules/.bin/knex seed:run
	npm run start
	
# Start the Express app
start:
	npm run start