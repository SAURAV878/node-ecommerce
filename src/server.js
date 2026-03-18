import app from "./app.js";
import database from './core/database.js';
import logger from "./utils/logger.js";

const PORT = 8000;

const startServer = async () => {
    await database.connect();

    const server = app.listen(PORT, () => {
        logger.info(`Server is running in ${PORT}`);
    });

    const shutdown = async () => {
        logger.info('Garceful Shutdown initaed');
        server.close(async () => {
            logger.info('server closed');

            await database.sequelize.close();
            logger.info('Database connection closed');
            process.exit(0);
        });
    };

    process.on('SIGTERM', shutdown); //used by doceker to stop containers
    process.on('SIGINT', shutdown); //used by CTRL+C

};

startServer();