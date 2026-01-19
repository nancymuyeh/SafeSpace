import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import storiesRouter from './routes/stories';
import resourcesRouter from './routes/resources';
import Keycloak from 'keycloak-connect';
import session from 'express-session';

const app = express();
const port = 3000;

const keycloak = new Keycloak({});
const memoryStore = new session.MemoryStore();

app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

app.use(keycloak.middleware());

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/v1/stories', keycloak.protect(), storiesRouter);
app.use('/api/v1/resources', resourcesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
