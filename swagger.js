const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Code Challenge API',
      version: '1.0.0',
      description: 'Code Challenge API description',
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  // Paths to files containing OpenAPI annotations.
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
