import express, { Express, Request, Response } from 'express';

import CONFIG from './config';

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(CONFIG.PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${CONFIG.PORT}`);
});
