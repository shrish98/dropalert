import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const globalForRedis = global;

const redisOptions = {
  maxRetriesPerRequest: 0,
  connectTimeout: 5000,
  commandTimeout: 5000,
  family: 0, // Force IPv4 to prevent Vercel DNS resolution hangs
};

const redis = globalForRedis.redis || new Redis(redisUrl, redisOptions);

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis;

export default redis;
