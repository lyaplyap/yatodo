import express, { Express } from 'express';

import todosRoute from './routes';
import { errorHandler } from './middlewares';

const app: Express = express();

app.use(express.json());

// Routes
app.use(`/api/todos`, todosRoute);

// Middlewares
app.use(errorHandler);

export default app;
