# Create and start the database
init-db:
	npx knex migrate:latest
	npx knex seed:run


# Copy env.sample file to env file and remove comments (lines starting with '#')
env:
	cp .env.sample .env

# Install the Express App
install:
	npm install

# Start the Express app in PRD mode
start:
	npm run start

# Start the Express app in dev mode
start-dev:
	npm run dev

# Unit test the app
test-unit:
	npm run test:unit

# Build the Express app containerized
docker-build:
	docker-compose build --no-cache 

# Start the Express app containerized
docker-start:
	docker-compose up

# Stop the Express app containerized
docker-stop:
	docker-compose down
