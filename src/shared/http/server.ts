import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import '@shared/typeorm';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination';
import rateLimiter from './middlewares/rateLimiter';

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use(pagination);

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use(errors());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  console.log(error);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
});

app.listen(process.env.APP_PORT, () => {
  console.log('Server on port ' + process.env.APP_PORT);
});
