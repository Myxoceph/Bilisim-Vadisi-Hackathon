export class RedisLock {
  constructor(redisClient, logger) {
    this.redis = redisClient;
    this.logger = logger;
    this.lockPrefix = "lock:";
    this.defaultTTL = 30;
  }

  async acquire(key, ttl = this.defaultTTL) {
    const lockKey = this.lockPrefix + key;
    const lockValue = `${Date.now()}_${Math.random()}`;

    try {
      const result = await this.redis.set(lockKey, lockValue, {
        NX: true,
        EX: ttl,
      });

      if (result === "OK") {
        this.logger.debug(`Lock acquired: ${lockKey}`);
        return lockValue;
      }

      this.logger.debug(`Lock already held: ${lockKey}`);
      return null;
    } catch (error) {
      this.logger.error(`Failed to acquire lock ${lockKey}:`, error);
      throw error;
    }
  }

  async release(key, lockValue) {
    const lockKey = this.lockPrefix + key;

    try {
      const luaScript = `
        if redis.call("get", KEYS[1]) == ARGV[1] then
          return redis.call("del", KEYS[1])
        else
          return 0
        end
      `;

      const result = await this.redis.eval(luaScript, {
        keys: [lockKey],
        arguments: [lockValue],
      });

      if (result === 1) {
        this.logger.debug(`Lock released: ${lockKey}`);
        return true;
      }

      this.logger.warn(`Lock not owned or already expired: ${lockKey}`);
      return false;
    } catch (error) {
      this.logger.error(`Failed to release lock ${lockKey}:`, error);
      throw error;
    }
  }

  async withLock(key, fn, ttl = this.defaultTTL) {
    const lockValue = await this.acquire(key, ttl);

    if (!lockValue) {
      throw new Error(`Failed to acquire lock for key: ${key}`);
    }

    try {
      const result = await fn();
      return result;
    } finally {
      await this.release(key, lockValue);
    }
  }

  async tryWithLock(key, fn, ttl = this.defaultTTL) {
    const lockValue = await this.acquire(key, ttl);

    if (!lockValue) {
      this.logger.warn(`Lock unavailable for key: ${key}`);
      return null;
    }

    try {
      const result = await fn();
      return result;
    } finally {
      await this.release(key, lockValue);
    }
  }

  async isLocked(key) {
    const lockKey = this.lockPrefix + key;
    const exists = await this.redis.exists(lockKey);
    return exists === 1;
  }

  async extend(key, lockValue, ttl) {
    const lockKey = this.lockPrefix + key;

    try {
      const luaScript = `
        if redis.call("get", KEYS[1]) == ARGV[1] then
          return redis.call("expire", KEYS[1], ARGV[2])
        else
          return 0
        end
      `;

      const result = await this.redis.eval(luaScript, {
        keys: [lockKey],
        arguments: [lockValue, ttl.toString()],
      });

      return result === 1;
    } catch (error) {
      this.logger.error(`Failed to extend lock ${lockKey}:`, error);
      throw error;
    }
  }
}

export default RedisLock;
