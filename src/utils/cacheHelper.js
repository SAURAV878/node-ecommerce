import redisClient from "../core/redis.js"

export const clearCache = async (prefix) => {

    const keys = await redisClient.keys(`${prefix}_*`);
    if(keys.length > 0) {
        await redisClient.del(keys);
    }
}