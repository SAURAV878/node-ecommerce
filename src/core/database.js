import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
import  logger from "../utils/logger.js";

dotenv.config();

class Database {
    constructor() {
        if (!Database.instance) {
            this.sequelize = new Sequelize (
                process.env.DB_NAME,
                process.env.DB_USER,
                process.env.DB_PASSWORD,
                {
                    host: process.env.DB_HOST,
                    port: process.env.DB_PORT,
                    dialect: 'mysql',
                    logging: (msg) => logger.debug(msg),

                    pool: {
                        max: 5,
                        min: 0,
                        acquire: 30000,
                        idle: 10000
                    }
                }
            );
            Database.instance = this;
        }
        return Database.instance;
    }
    async connect () {
        try {
            await this.sequelize.authenticate();
            logger.info('connect');
        } catch (error) {
            logger.error('Unable to connect', error);
            process.exit(1);
        }
    }

}

const instance = new Database();
export default instance;

