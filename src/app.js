import express from 'express';
import authRoutes from './routes/auth.js'
import errorHandler from './middlewares/handle.js';
import morgan from 'morgan';
import logger from './utils/logger.js';

const app = express();

app.use(morgan('dev', {
    stream: {
        write: (message) => logger.http(message.trim())
    }
}));

app.use(express.json());

app.use('/', authRoutes);

app.use(errorHandler);

export default app;