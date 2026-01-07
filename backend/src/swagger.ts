import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'SafeSpace API',
    version: '1.0.0',
    description: 'API for the SafeSpace application',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  components: {
    schemas: {
      Story: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          content: {
            type: 'string',
          },
          mood: {
            type: 'string',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
      NewStory: {
        type: 'object',
        properties: {
          content: {
            type: 'string',
          },
          mood: {
            type: 'string',
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/index.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
