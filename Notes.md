# Notes

Hello, and thank you for taking the time to review this coding challenge; completing it was a lot of fun; I needed about two hours for this.

## Future Improvements
Given more time, a myriad of different improvements could be implemented, including (but not limited to):
- **Controller/Routing**: Implement better routing and add more routes to the controller.
- **Services**: Add more functionality to the services.
- **Testing**: Increase test coverage.
- **Error Handling**: Implement better error handling.
- **Logging**: Integrate logging for debugging and monitoring.
- **Documentation**: Add Swagger documentation, use Mermaid for modeling database.

## Dependencies
Run `npm install` from the `/api` directory to install the dependencies.

## Linting 
Run `npm run lint` from the `/api` directory to lint the project.

## Testing 
Run `npm run test` from the `/api` directory to run the tests.

## Environment Variables
Create a `.env` file and add the following `WEBSERVER_PORT=3000`.

### Starting the App
- **Local Development (without Docker)**: Run `npm run dev` in the `/api` directory. The app will be accessible at `http://localhost:3000`.
- **Development with Docker**: Run `docker compose up` from the `/Coding-challenge-nodejs` directory. The app will be accessible at `http://localhost:3000`.

## Postman Collection
To test the API endpoints, use the provided Postman collection in the `/Coding-challenge-nodejs` directory.