import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import storiesRouter from './routes/stories';
import resourcesRouter from './routes/resources';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/v1/stories', storiesRouter);
app.use('/api/v1/resources', resourcesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
