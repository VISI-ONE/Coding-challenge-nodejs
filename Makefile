# Create and start the database
init-db:
	npx knex migrate:latest
	npx knex seed:run

# Create prod database and move it to docker image just to test
init-prod-db:
	npx knex migrate:latest --env production
	npx knex seed:run --env production

# Start the Express app
start:
	node src/index.js

lint:
	npm run lint

test:
	npm test

build: init-prod-db
	docker build -t $(IMAGE_NAME) .

run:
	docker run -p 3000:3000 -e PORT=3000 $(IMAGE_NAME)
