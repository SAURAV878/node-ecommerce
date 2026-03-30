import { createClient } from "redis";
import logger from "../utils/logger.js";


const redisClient = createClient ({
    url: 'redis://localhost:6378'
});

redisClient.on('error', (err) => {
    logger.error('Redis Error: ', err); 
});

redisClient.on('ready', () => {
    logger.info('Redis Client: Ready and Connected')
});

await redisClient.connect();

export default redisClient;
