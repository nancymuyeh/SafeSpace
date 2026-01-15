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
          id: { type: 'string', format: 'uuid' },
          content: { type: 'string' },
          mood: { type: 'string' },
          userId: { type: 'string', format: 'uuid', nullable: true },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      NewStory: {
        type: 'object',
        required: ['content', 'mood'],
        properties: {
          content: { type: 'string' },
          mood: { type: 'string' },
          userId: { type: 'string', format: 'uuid' },
        },
      },
      Reaction: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          storyId: { type: 'string', format: 'uuid' },
          type: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      Report: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          storyId: { type: 'string', format: 'uuid' },
          reason: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      Resource: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          title: { type: 'string' },
          description: { type: 'string' },
          url: { type: 'string' },
          type: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
