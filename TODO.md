## Notes
To run in development mode
```bash
npm install
make init-db
npm run dev
```

Tests
```bash
npm run test
npm run coverage
```

Docker
```bash
docker build . -t visione
docker run -p 8080:8080 visione
```

- I use absolute versioning in production dependencies to avoid unexpected behaviours.

- See the `visione.postman_collection.json` file in the root folder for postman.

- I would consider switching to typescript for type safety.

- I would consider using ES6 module system especially for a greenfield project.

- I spent around two and a half hours. The main reason is the 1 year gap that I mentioned in the interview. The more I code, the faster I will become of course.

- Vehicles table definition and the relation with the priceboard was not clear enough. So I had to make some guesses. I can update the code if I understand what  exactly vehicles table for. Can there be multiple vehicles for one product? Or vehicles table is to store vehicle types to associate with product?

- I avoid using default `index.js` filename for modules. Because it makes it harder search when project gets bigger.

## What I would do if I had more time?

### API
- add other CRUD methods
- add a middleware for authorization
- use helmet.js for CORS protection
- do better log handling
- add config manager
- get the `v1` api endpoint prefix from the config

### DOCKER
- add .dockerignore file
- add multi-stage for better caching and optimization

### TEST
Add more test cases

### Syntax
- add prettier and eslint
- add standard.js as the coding convention plus some extra rules

