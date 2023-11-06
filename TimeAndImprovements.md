# Time Log and Improvements

## Time Taken

- Start Time: 13:54
- End Time: 15:40
- Total Time: 1 hour and 30 minutes

## Tasks Completed

- **Nodemon and Jest Installation**: Installed `nodemon` to automatically restart the server during development and `jest` for unit testing.

- **Separation of Concerns**:
  - Created dedicated directories for better organization:
    - Database connection (`/db`)
    - Route definitions (`/routes`)
    - Controller logic (`/controllers`)
    - Tests (`/tests`)
  - This separation enhances the maintainability of the codebase.

- **API Testing**:
  - Implemented a basic test for the priceboard retrieval route to ensure functionality.

- **Dockerization**:
  - Crafted a `Dockerfile` to containerize the application, facilitating easier deployment and environment consistency.

## Pending Tasks

- **Database Migration for 'Vehicles' Entity**:
  - Need to create a migration to add a 'vehicles' table to the database.

- **New Endpoint for Vehicle-Priceboard Association**:
  - An endpoint is required that would allow associating a vehicle with a priceboard, ensuring that both entities belong to the same tenant.

## Future Enhancements

Given more time, the following improvements would be prioritized:

- **Error Handling Middleware**: Implement middleware for centralized error management to handle exceptions and HTTP errors gracefully.

- **Input Validation**: Introduce rigorous validation for incoming data to prevent invalid data processing and enhance security.

- **Environment Variables**:
  - Utilize environment variables to configure application settings, allowing for flexible deployment across different environments.
  - Ensure these variables are accessible when running the application with `docker run`.

