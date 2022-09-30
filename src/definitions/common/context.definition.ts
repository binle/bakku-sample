import { LoggerOptions } from '@bakku/logger';
import { RedisClientType } from 'redis';

export interface IRedisGlobal {
  redisClient: RedisClientType;
  asyncGet<T extends unknown>(key: string, deleteAfterGet?: boolean): Promise<T | undefined>;

  asyncSet<T extends unknown>(key: string, data: T, expiredTime?: number): Promise<void>;
  asyncDelete(key: string): Promise<void>;
}

export interface IDatabaseConfigOptions {
  port: number;
  host: string;
  username: string;
  password: string;
  database: string;
}

export interface IConfigGlobal {
  host: string;
  port: string | number;
  allowed_origin_urls: string[];
  client_path: string;
  client_configs: {
    domain?: string;
  };
  log_config: LoggerOptions;
  database_config: IDatabaseConfigOptions;
  redis_config: {
    url: string;
  };
}
