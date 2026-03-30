import express from 'express';
import authRoutes from './routes/auth.js';
import loginRoutes from './routes/login.js';
import productRoutes from './routes/product.js';
import categoryRoutes from './routes/category.js';
import OrderRoutes from './routes/order.js';
import cartRoutes from './routes/cart.js';
import errorHandler from './middlewares/handle.js';
import morgan from 'morgan';
import logger from './utils/logger.js';
import { limiter } from './middlewares/ratelimit.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger.js';

const app = express();

app.use(morgan('dev', {
    stream: {
        write: (message) => logger.http(message.trim())
    }
}));

app.use(express.json());
app.use(limiter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/', authRoutes);
app.use('/', loginRoutes);
app.use('/', productRoutes);
app.use('/', categoryRoutes);
app.use('/', OrderRoutes);
app.use('/', cartRoutes);


app.use(errorHandler);

export default app;