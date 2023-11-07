import express, { Express } from 'express';
import cors from 'cors';

import todosRoute from './routes';
import { errorHandler } from './middlewares';

const app: Express = express();

app.use(cors({ origin: '*', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' }));
app.use(express.json());

// Routes
app.use(`/api/todos`, todosRoute);

// Middlewares
app.use(errorHandler);

export default app;
